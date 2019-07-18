import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRequestDto {
  @Field({ nullable: true })
  _id?: string; //tslint:disable-line

  @Field()
  start!: Date;

  @Field()
  end!: Date;

  @Field()
  receiver!: string;

  @Field()
  @IsNotEmpty()
  description!: string;
}
