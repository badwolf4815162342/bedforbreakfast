import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import { prop, Ref, Typegoose } from 'typegoose';
import { User } from '../../users/models/User';

@ObjectType()
export class Meal extends Typegoose {
  @Field((type) => ID)
  readonly _id!: ObjectId; // tslint:disable-line variable-name

  @Field((type) => User)
  @prop({ ref: User, required: true })
  user!: Ref<ObjectId>;

  // TODO: picture

  @Field((type) => String)
  @prop({ required: true })
  description!: string;
}

export const MealModel = new Meal().getModelForClass(Meal);
