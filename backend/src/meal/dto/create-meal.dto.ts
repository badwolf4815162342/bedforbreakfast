import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateMealDto {
  @Field({ nullable: true })
  _id?: string; //tslint:disable-line

  @Field()
  @IsNotEmpty()
  description!: string;
}
