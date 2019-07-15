import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { MealResolver } from './meal.resolver';
import { MealService } from './meal.service';
import { Meal } from './models/Meal';

@Module({
  imports: [TypegooseModule.forFeature([Meal])],
  providers: [MealService, MealResolver],
})
export class MealModule {}
