import { Field, InputType } from 'type-graphql';

@InputType()
export class LikeTripReportDto {
  @Field({ nullable: true })
  _id!: string; //tslint:disable-line
}
