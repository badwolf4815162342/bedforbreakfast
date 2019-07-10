import { Field, ObjectType } from 'type-graphql';
import { prop, Typegoose } from 'typegoose';

@ObjectType()
export class User extends Typegoose {
  @Field((type) => String)
  @prop({ required: true })
  email!: string;

  @Field((type) => String)
  @prop({ required: true })
  password!: string;

  @Field((type) => String)
  @prop({ required: true })
  phoneNumber!: string;

  @Field((type) => Boolean)
  @prop({ required: true })
  isHost!: boolean;

  @Field((type) => Boolean)
  @prop({ required: true })
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
  @prop({ required: true })
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

type GenderType = 'm' | 'w' | 'd';
