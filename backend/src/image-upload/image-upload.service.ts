import { Injectable } from '@nestjs/common';
// @ts-ignore
import cloudinary from 'cloudinary';
// @ts-ignore
import promisesAll from 'promises-all';
import { Upload } from 'src/common/types/Upload';

cloudinary.config({
  cloud_name: 'bed-for-breakfast',
  api_key: '636324567563398',
  api_secret: 'rLxWH6T-1bW4XY4l2DdiR60ESx0',
});

@Injectable()
export class ImageUploadService {
  async singleFileUpload(file: Upload) {
    return this.processUpload(file);
  }

  async multipleFileUpload(files: Upload[]) {
    const { resolve, reject } = await promisesAll.all(files.map(this.processUpload));

    if (reject.length) {
      reject.forEach((name: string, message: string) => {
        throw new Error(`Failed to upload profile picture ! Err:${name}:${message}`);
      });
    }
    return resolve;
  }

  private async processUpload(upload: Upload) {
    const { createReadStream } = upload;

    let resultUrl = '';

    const cloudinaryUpload = async (stream: any) => {
      try {
        await new Promise((resolve, reject) => {
          const streamLoad = cloudinary.v2.uploader.upload_stream((error: any, result: any) => {
            if (result) {
              resultUrl = result.url;
              resolve(resultUrl);
            } else {
              reject(error);
            }
          });

          stream.pipe(streamLoad);
        });
      } catch (err) {
        throw new Error(`Failed to upload profile picture ! Err:${err.message}`);
      }
    };

    await cloudinaryUpload(createReadStream());
    return resultUrl;
  }
}
