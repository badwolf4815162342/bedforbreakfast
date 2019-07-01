import { Field, ObjectType } from 'type-graphql';
import { prop, Typegoose } from 'typegoose';

@ObjectType()
export class Accommodation extends Typegoose {
  @Field((type) => String)
  @prop({ required: true })
  name!: string;

  @Field((type) => String)
  @prop({ required: true })
  city!: string;
}
