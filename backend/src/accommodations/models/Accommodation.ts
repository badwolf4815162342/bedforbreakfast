import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop, Ref, Typegoose } from 'typegoose';

import { ObjectIdScalar } from '../../common/scalars/object-id.scalar';
import { User } from '../../users/models/User';

@ObjectType()
export class Accommodation extends Typegoose {
  @Field((type) => ObjectIdScalar)
  readonly _id!: ObjectId; // tslint:disable-line variable-name

  @Field((type) => User)
  @prop({ ref: User, required: true })
  user!: Ref<ObjectId>;

  @Field((type) => Boolean)
  @prop({ required: true })
  isActive!: boolean;

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

  @Field((type) => String, { nullable: true })
  @prop()
  description?: string;

  @Field((type) => String, { nullable: true })
  @prop()
  district?: string;

  @Field((type) => Number)
  @prop({ required: true })
  numberOfBeds!: string;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @prop()
  pictures?: string[];
}
