import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables set in Render's dashboard.
// Required env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class ObjectNotFoundError extends Error {
  constructor(message = 'Object not found') {
    super(message);
    this.name = 'ObjectNotFoundError';
  }
}

export interface GalleryImage {
  objectPath: string; // Cloudinary public_id, used as our internal reference
  servingUrl: string; // Cloudinary secure_url, used to actually display the image
  name: string; // original filename
}

const FOLDER = 'brickbybrick-gallery';

export class ObjectStorageService {
  /**
   * Uploads a file buffer to Cloudinary and returns its stored info.
   */
  async uploadObject(fileBuffer: Buffer, originalName: string): Promise<GalleryImage> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: FOLDER,
          resource_type: 'image',
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Upload failed'));
          }
          resolve({
            objectPath: result.public_id,
            servingUrl: result.secure_url,
            name: originalName,
          });
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  /**
   * Lists all images currently stored in the gallery folder.
   */
  async listObjects(): Promise<GalleryImage[]> {
    const result = await cloudinary.search
      .expression(`folder:${FOLDER}`)
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    return result.resources.map((resource: any) => ({
      objectPath: resource.public_id,
      servingUrl: resource.secure_url,
      name: resource.filename || resource.public_id,
    }));
  }

  /**
   * Deletes an image from Cloudinary by its public_id (objectPath).
   */
  async deleteObject(objectPath: string): Promise<void> {
    const result = await cloudinary.uploader.destroy(objectPath, {
      resource_type: 'image',
    });
    if (result.result !== 'ok' && result.result !== 'not found') {
      throw new Error(`Failed to delete object: ${result.result}`);
    }
    if (result.result === 'not found') {
      throw new ObjectNotFoundError();
    }
  }"Replace with Cloudinary storage"
}

export const objectStorageService = new ObjectStorageService();
