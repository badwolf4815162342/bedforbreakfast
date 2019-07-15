import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import { prop, Ref, Typegoose } from 'typegoose';
import { User } from '../../user/models/User';

@ObjectType()
export class Rating extends Typegoose {
  /** TODO: @Field((type) => User)
  @prop({ ref: User, required: true })
  receiver!: Ref<User>;  */ //tslint:disable-line

  @Field((type) => Boolean)
  @prop({ required: true })
  rating!: boolean;

  @Field((type) => String)
  @prop({ required: true })
  description!: string;

  @Field((type) => String)
  @prop({ required: true })
  receiverRole!: RoleType;
}

export const RatingModel = new Rating().getModelForClass(Rating);

export type RoleType = 'MEAL' | 'ACCOMMONDATION';
