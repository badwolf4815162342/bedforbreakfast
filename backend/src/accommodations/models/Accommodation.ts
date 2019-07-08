import { Field, ObjectType } from 'type-graphql';
import { prop, Typegoose } from 'typegoose';

@ObjectType()
export class Accommodation extends Typegoose {
  @Field((type) => String)
  @prop({ required: true })
  country!: string;

  @Field((type) => String)
  @prop({ required: true })
  streetName!: string;

  @Field((type) => String)
  @prop({ required: true })
  streetNumber!: string;

  @Field((type) => String)
  @prop({ required: true })
  zipCode!: string;

  @Field((type) => String)
  @prop({ required: true })
  city!: string;

  @Field((type) => String)
  @prop({ required: false })
  description!: string;

  @Field((type) => Number)
  @prop({ required: true })
  numberOfBeds!: string;
}
