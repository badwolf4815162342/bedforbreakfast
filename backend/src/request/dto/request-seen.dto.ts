import { Field, InputType } from 'type-graphql';

@InputType()
export class RequestSeenDto {
  @Field({ nullable: true })
  _id!: string; //tslint:disable-line
}
