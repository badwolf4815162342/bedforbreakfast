import { forwardRef, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AccommodationsModule } from '../accommodations/accommodations.module';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { MealModule } from '../meal/meal.module';
import { User } from './models/User';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    forwardRef(() => AccommodationsModule),
    ImageUploadModule,
    forwardRef(() => MealModule),
  ],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
