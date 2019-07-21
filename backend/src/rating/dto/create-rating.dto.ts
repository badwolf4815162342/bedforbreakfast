import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRatingDto {
  @Field({ nullable: true })
  _id?: string; //tslint:disable-line

  @Field()
  request!: string;

  @Field()
  @IsNotEmpty()
  description!: string;

  @Field()
  rating!: boolean;
}
