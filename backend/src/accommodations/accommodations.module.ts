import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AuthenticationModule } from '../authentication/authentication.module';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { UsersModule } from '../users/users.module';
import { AccommodationResolver } from './accommodations.resolver';
import { AccommodationsService } from './accommodations.service';
import { Accommodation } from './models/Accommodation';

@Module({
  imports: [TypegooseModule.forFeature([Accommodation]), AuthenticationModule, UsersModule, ImageUploadModule],
  providers: [AccommodationsService, AccommodationResolver],
  exports: [AccommodationsService],
})
export class AccommodationsModule {}
