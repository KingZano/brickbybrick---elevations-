import { Readable } from 'stream';
import { z } from 'zod';
import { Router, type IRouter, type Request, type Response } from 'express';
import {
  ObjectNotFoundError,
  ObjectStorageService,
  objectStorageClient,
} from '../lib/objectStorage';

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

const RequestUploadUrlBody = z.object({
  name: z.string(),
  size: z.number(),
  contentType: z.string(),
});

/** Check X-Admin-Pin header against ADMIN_PIN env var */
function isAdminAuthorized(req: Request): boolean {
  const pin = process.env.ADMIN_PIN;
  if (!pin) return false;
  return req.headers['x-admin-pin'] === pin;
}

/**
 * POST /storage/uploads/request-url
 * Request a presigned URL for file upload. Requires admin PIN.
 */
router.post(
  '/storage/uploads/request-url',
  async (req: Request, res: Response) => {
    if (!isAdminAuthorized(req)) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const parsed = RequestUploadUrlBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'Missing or invalid required fields' });
      return;
    }

    try {
      const { name, size, contentType } = parsed.data;
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      const objectPath = objectStorageService.normalizeObjectEntityPath(uploadURL);

      res.json({ uploadURL, objectPath, metadata: { name, size, contentType } });
    } catch (error) {
      req.log.error({ err: error }, 'Error generating upload URL');
      res.status(500).json({ error: 'Failed to generate upload URL' });
    }
  },
);

/**
 * GET /storage/gallery
 * List all uploaded project images (object paths + serving URLs).
 */
router.get('/storage/gallery', async (req: Request, res: Response) => {
  try {
    const privateObjectDir = objectStorageService.getPrivateObjectDir();
    // privateObjectDir format: gs://bucket-name/prefix
    const match = privateObjectDir.match(/^gs:\/\/([^/]+)\/?(.*)/);
    if (!match) {
      res.status(500).json({ error: 'Invalid PRIVATE_OBJECT_DIR format' });
      return;
    }
    const bucketName = match[1];
    const prefix = match[2] ? match[2].replace(/\/?$/, '/') : '';

    const bucket = objectStorageClient.bucket(bucketName);
    const [files] = await bucket.getFiles({ prefix });

    const images = files
      .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f.name))
      .map((f) => {
        const objectName = f.name.replace(prefix, '');
        return {
          objectPath: `/objects/${objectName}`,
          servingUrl: `/api/storage/objects/${objectName}`,
          name: objectName,
        };
      });

    res.json({ images });
  } catch (error) {
    req.log.error({ err: error }, 'Error listing gallery');
    res.status(500).json({ error: 'Failed to list gallery' });
  }
});

/**
 * DELETE /storage/gallery/:objectName
 * Delete an uploaded image. Requires admin PIN.
 */
router.delete(
  '/storage/gallery/:objectName',
  async (req: Request, res: Response) => {
    if (!isAdminAuthorized(req)) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const privateObjectDir = objectStorageService.getPrivateObjectDir();
      const match = privateObjectDir.match(/^gs:\/\/([^/]+)\/?(.*)/);
      if (!match) {
        res.status(500).json({ error: 'Invalid PRIVATE_OBJECT_DIR format' });
        return;
      }
      const bucketName = match[1];
      const prefix = match[2] ? match[2].replace(/\/?$/, '/') : '';
      const objectName = req.params.objectName;

      const bucket = objectStorageClient.bucket(bucketName);
      const file = bucket.file(`${prefix}${objectName}`);
      const [exists] = await file.exists();
      if (!exists) {
        res.status(404).json({ error: 'File not found' });
        return;
      }
      await file.delete();
      res.json({ success: true });
    } catch (error) {
      req.log.error({ err: error }, 'Error deleting gallery image');
      res.status(500).json({ error: 'Failed to delete image' });
    }
  },
);

/**
 * GET /storage/public-objects/*
 * Serve public assets from PUBLIC_OBJECT_SEARCH_PATHS (unconditionally public).
 */
router.get(
  '/storage/public-objects/*filePath',
  async (req: Request, res: Response) => {
    try {
      const raw = req.params.filePath;
      const filePath = Array.isArray(raw) ? raw.join('/') : raw;
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        res.status(404).json({ error: 'File not found' });
        return;
      }
      const response = await objectStorageService.downloadObject(file);
      res.status(response.status);
      response.headers.forEach((value, key) => res.setHeader(key, value));
      if (response.body) {
        const nodeStream = Readable.fromWeb(response.body as ReadableStream<Uint8Array>);
        nodeStream.pipe(res);
      } else {
        res.end();
      }
    } catch (error) {
      req.log.error({ err: error }, 'Error serving public object');
      res.status(500).json({ error: 'Failed to serve public object' });
    }
  },
);

/**
 * GET /storage/objects/*
 * Serve uploaded object entities (project photos — public, no auth needed to view).
 */
router.get('/storage/objects/*path', async (req: Request, res: Response) => {
  try {
    const raw = req.params.path;
    const wildcardPath = Array.isArray(raw) ? raw.join('/') : raw;
    const objectPath = `/objects/${wildcardPath}`;
    const objectFile = await objectStorageService.getObjectEntityFile(objectPath);
    const response = await objectStorageService.downloadObject(objectFile);
    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    if (response.body) {
      const nodeStream = Readable.fromWeb(response.body as ReadableStream<Uint8Array>);
      nodeStream.pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    if (error instanceof ObjectNotFoundError) {
      res.status(404).json({ error: 'Object not found' });
      return;
    }
    req.log.error({ err: error }, 'Error serving object');
    res.status(500).json({ error: 'Failed to serve object' });
  }
});

export default router;
