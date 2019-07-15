import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { GenderType, User } from '../models/User';

@InputType()
export class CreateUserDto implements Partial<User> {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;

  @Field()
  @IsPhoneNumber('ZZ')
  phoneNumber!: string;

  @Field()
  isHost!: boolean;

  @Field()
  isGuest!: boolean;

  @Field()
  @IsNotEmpty()
  firstName!: string;

  @Field()
  @IsNotEmpty()
  lastName!: string;

  @Field()
  birthday!: Date;

  @Field()
  gender!: GenderType;

  @Field()
  @IsNotEmpty()
  description!: string;

  @Field()
  profilePicture!: string;

  @Field()
  verified!: boolean;

  @Field()
  @IsNotEmpty()
  homeTown!: string;

  @Field()
  @IsNotEmpty()
  homeCountry!: string;

  @Field()
  @IsNotEmpty()
  favoriteFood!: string;
}
