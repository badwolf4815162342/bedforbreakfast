import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { ImageUploadModule } from '../image-upload/image-upload.module';
import { MealResolver } from './meal.resolver';
import { MealService } from './meal.service';
import { Meal } from './models/Meal';

@Module({
  imports: [TypegooseModule.forFeature([Meal]), ImageUploadModule],
  providers: [MealService, MealResolver],
  exports: [MealService, MealResolver],
})
export class MealModule {}
