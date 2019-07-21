import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import { arrayProp, prop, Ref, Typegoose } from 'typegoose';

import { Accommodation } from '../../accommodations/models/Accommodation';
import { Meal } from '../../meal/models/Meal';

@ObjectType()
export class User extends Typegoose {
  @Field((type) => ID)
  readonly _id!: ObjectId; // tslint:disable-line variable-name

  @Field((type) => String)
  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  @Field((type) => String)
  @prop({ required: true })
  phoneNumber!: string;

  @Field((type) => String)
  @prop({ required: true })
  firstName!: string;

  @Field((type) => String)
  @prop({ required: true })
  lastName!: string;

  @Field((type) => Date)
  @prop({ required: true })
  birthday!: Date;

  @Field((type) => String)
  @prop({ required: true })
  gender!: GenderType;

  @Field((type) => String)
  @prop({ required: true })
  description!: string;

  @Field((type) => String)
  @prop({ required: true })
  profilePicture!: string;

  @Field((type) => Boolean)
  @prop({ required: true, default: false })
  verified!: boolean;

  @Field((type) => String)
  @prop({ required: true })
  homeTown!: string;

  @Field((type) => String)
  @prop({ required: true })
  homeCountry!: string;

  @Field((type) => String)
  @prop({ required: true })
  favoriteFood!: string;

  @Field((type) => [User])
  @arrayProp({ itemsRef: 'User' })
  likedBy?: Array<Ref<ObjectId>>;

  @Field((type) => [User])
  @arrayProp({ itemsRef: 'User' })
  dislikedBy?: Array<Ref<ObjectId>>;

  @Field((type) => Accommodation, { nullable: true })
  @prop({ ref: User })
  accommodation?: Ref<ObjectId>;

  @Field((type) => [Meal])
  @arrayProp({ itemsRef: 'Meal' })
  meals?: Array<Ref<ObjectId>>;
}

export type GenderType = 'm' | 'f' | 'd';
