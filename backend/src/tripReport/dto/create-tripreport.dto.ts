import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTripReportDto {
  // @Field()
  // creatorID!: string;

  // @Field()
  // referenceID!: string;

  @Field()
  authorRole!: string;

  @Field()
  profilePicture!: string[];

  @Field()
  text!: string;

  @Field()
  likedBy!: string[];

  @Field()
  start!: Date;

  @Field()
  end!: Date;
}
