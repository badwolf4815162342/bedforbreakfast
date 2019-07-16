import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Meal } from '../models/Meal';

@InputType()
export class CreateMealDto implements Partial<Meal> {
  @Field()
  @IsNotEmpty()
  description!: string;
}
