import { Field, ObjectType } from 'type-graphql';
import { prop, Typegoose } from 'typegoose';

@ObjectType()
export class Meal extends Typegoose {
  // TODO: picture

  @Field((type) => String)
  @prop({ required: true })
  description!: string;
}

export const MealModel = new Meal().getModelForClass(Meal);
