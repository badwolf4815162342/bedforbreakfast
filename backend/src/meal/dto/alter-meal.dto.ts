import { IsNotEmpty } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload';
import { Field, InputType } from 'type-graphql';
import { Upload } from '../../common/types/Upload';

@InputType()
export class CreateMealDto {
  @Field({ nullable: true })
  _id?: string; //tslint:disable-line

  @Field()
  @IsNotEmpty()
  description!: string;

  @Field((type) => GraphQLUpload)
  profilePicture!: Upload;
}
