import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload';
import { Field, InputType } from 'type-graphql';

import { Upload } from '../../common/types/Upload';
import { GenderType } from '../models/User';

@InputType()
export class SignUpDto {
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

  @Field((type) => GraphQLUpload)
  profilePicture!: Upload;

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
