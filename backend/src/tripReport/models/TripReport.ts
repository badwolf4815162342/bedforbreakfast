import { Field, ObjectType } from 'type-graphql';
import { prop, Typegoose } from 'typegoose';

@ObjectType()
export class TripReport extends Typegoose {
  // @Field((type) => String)
  // @prop({ required: true })
  // creatorID!: string;

  // @Field((type) => String)
  // @prop({ required: true })
  // referenceID!: string;

  @Field((type) => String)
  @prop({ required: true })
  authorRole!: string;

  @Field((type) => [String])
  @prop({ required: true })
  pictures!: string[];

  @Field((type) => String)
  @prop({ required: true })
  text!: string;

  @Field((type) => [String])
  @prop({ required: true })
  likedBy!: string[];

  @Field((type) => Date)
  @prop({ required: true })
  start!: Date;

  @Field((type) => Date)
  @prop({ required: true })
  end!: Date;
}
