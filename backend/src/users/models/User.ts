import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import { prop, Typegoose } from 'typegoose';

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

  @Field((type) => Boolean)
  @prop({ required: true, default: false })
  isHost!: boolean;

  @Field((type) => Boolean)
  @prop({ required: true, default: false })
  isGuest!: boolean;

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
}

export type GenderType = 'm' | 'w' | 'd';
