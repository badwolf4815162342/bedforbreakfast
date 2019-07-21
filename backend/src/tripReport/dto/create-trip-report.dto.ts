import { IsNotEmpty } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from 'src/common/types/Upload';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTripReportDto {
  @Field({ nullable: true })
  _id?: string; //tslint:disable-line

  @Field()
  request!: string;

  @Field()
  @IsNotEmpty()
  description!: string;

  @Field((type) => [GraphQLUpload], { nullable: 'itemsAndList' })
  pictures?: Upload[];
}
