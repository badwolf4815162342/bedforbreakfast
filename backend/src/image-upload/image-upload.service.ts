import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  async singleFileUpload(file: Upload, options?: any): Promise<string> {
    return await this.processUpload(file, options);
  }

  async multipleFileUpload(files: Upload[], options: any) {
    const { resolve, reject } = await promisesAll.all(files.map((file) => this.processUpload(file, options)));

    if (reject.length) {
      reject.forEach((name: string, message: string) => {
        throw new HttpException(
          {
            status: HttpStatus.SERVICE_UNAVAILABLE,
            error: 'Failed to upload picture.',
          },
          503,
        );
      });
    }
    return resolve;
  }

  private async processUpload(upload: Upload, options: any) {
    const { createReadStream } = await upload;

    let resultUrl = '';

    const cloudinaryUpload = async (stream: any) => {
      try {
        await new Promise((resolve, reject) => {
          const streamLoad = cloudinary.v2.uploader.upload_stream(options, (error: any, result: any) => {
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
        throw new HttpException(
          {
            status: HttpStatus.SERVICE_UNAVAILABLE,
            error: 'Failed to upload picture.',
          },
          503,
        );
      }
    };

    await cloudinaryUpload(createReadStream());
    return resultUrl;
  }
}
