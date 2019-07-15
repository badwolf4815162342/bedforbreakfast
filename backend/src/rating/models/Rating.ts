import { Field, ObjectType } from 'type-graphql';
import { prop, Typegoose } from 'typegoose';

@ObjectType()
export class Rating extends Typegoose {
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
