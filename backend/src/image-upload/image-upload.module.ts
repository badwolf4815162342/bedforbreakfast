import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';

@Module({
  imports: [],
  providers: [ImageUploadService],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
