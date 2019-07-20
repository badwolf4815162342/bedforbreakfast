import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { GenderType } from '../models/User';

@InputType()
export class AlterUserDto {
  @Field({ nullable: true })
  _id?: string; //tslint:disable-line

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;

  @Field()
  @IsPhoneNumber('ZZ')
  phoneNumber!: string;

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
  @IsNotEmpty()
  homeTown!: string;

  @Field()
  @IsNotEmpty()
  homeCountry!: string;

  @Field()
  @IsNotEmpty()
  favoriteFood!: string;
}
