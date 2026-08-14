import { Router, type IRouter, type Request, type Response } from 'express';
import multer from 'multer';
import {
  ObjectNotFoundError,
  ObjectStorageService,
} from '../lib/objectStorage';

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

// Store uploaded files in memory temporarily before forwarding to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
});

/** Check X-Admin-Pin header against ADMIN_PIN env var */
function isAdminAuthorized(req: Request): boolean {
  const pin = process.env.ADMIN_PIN;
  if (!pin) return false;
  return req.headers['x-admin-pin'] === pin;
}

/**
 * GET /storage/gallery
 * Lists all uploaded gallery images. Requires admin PIN.
 */
router.get('/storage/gallery', async (req: Request, res: Response) => {
  if (!isAdminAuthorized(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    const images = await objectStorageService.listObjects();
    res.json({ images });
  } catch (err) {
    console.error('Failed to list gallery images', err);
    res.status(500).json({ error: 'Failed to list images' });
  }
});

/**
 * POST /storage/gallery/upload
 * Accepts a multipart/form-data upload with field name "photo".
 * Requires admin PIN.
 */
router.post(
  '/storage/gallery/upload',
  upload.single('photo'),
  async (req: Request, res: Response) => {
    if (!isAdminAuthorized(req)) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    try {
      const image = await objectStorageService.uploadObject(
        req.file.buffer,
        req.file.originalname
      );
      res.status(201).json({ image });
    } catch (err) {
      console.error('Failed to upload image', err);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  }
);

/**
 * DELETE /storage/gallery/:objectPath
 * Deletes an image by its Cloudinary public_id. Requires admin PIN.
 * Note: objectPath may contain a "/" (folder prefix), so we accept it as a
 * wildcard param and reconstruct it.
 */
router.delete('/storage/gallery/*', async (req: Request, res: Response) => {
  if (!isAdminAuthorized(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const objectPath = (req.params as any)[0];
  if (!objectPath) {
    res.status(400).json({ error: 'Missing object path' });
    return;
  }
  try {
    await objectStorageService.deleteObject(objectPath);
    res.status(204).send();
  } catch (err) {
    if (err instanceof ObjectNotFoundError) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }
    console.error('Failed to delete image', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export default router;
