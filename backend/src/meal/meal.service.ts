import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { CreateMealDto } from './dto/create-meal.dto';
import { Meal } from './models/Meal';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal)
    private readonly mealModel: ModelType<Meal>,
  ) {}

  async findAll(): Promise<Meal[]> {
    return await this.mealModel.find().exec();
  }

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const createdMeal = new this.mealModel(createMealDto);
    return await createdMeal.save();
  }
}
