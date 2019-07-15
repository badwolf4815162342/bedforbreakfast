import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealService } from './meal.service';
import { Meal } from './models/Meal';

@Resolver((of: any) => {
  return Meal;
})
export class MealResolver {
  constructor(private readonly mealService: MealService) {}

  @Query((returns) => [Meal])
  async meals(): Promise<Meal[]> {
    return this.mealService.findAll();
  }

  @Mutation((returns) => Meal)
  async createMeal(@Args('createMealDto') createMealDto: CreateMealDto): Promise<Meal> {
    return await this.mealService.create(createMealDto);
  }
}
