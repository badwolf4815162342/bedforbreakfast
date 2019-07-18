import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { ObjectId } from 'mongodb';
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

  async findById(id: ObjectId): Promise<Meal | null> {
    return this.mealModel.findById(id);
  }

  async create(createMealDto: {}): Promise<Meal> {
    const createdMeal = new this.mealModel(createMealDto);
    return await createdMeal.save();
  }
}
