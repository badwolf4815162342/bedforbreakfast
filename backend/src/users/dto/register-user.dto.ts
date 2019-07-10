import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterUserDto {
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
  gender!: string;

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
