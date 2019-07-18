
import { Field, InputType } from 'type-graphql';

@InputType()
export class CanBeRequestedDto {
  @Field({ nullable: true })
  _id?: string; //tslint:disable-line

  @Field()
  hostId!: string;

  @Field()
  requestId!: string;
}
