import { Field, InputType } from 'type-graphql';
import { RequestStatus } from '../models/Request';

@InputType()
export class UpdateRequestStatusDto {
  @Field({ nullable: true })
  _id!: string; //tslint:disable-line

  @Field((type) => RequestStatus) // it's very important
  requestStatus!: RequestStatus;
}
