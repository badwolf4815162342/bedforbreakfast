import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTripReportDto {
  // @Field()
  // creatorID!: string;

  // @Field()
  // referenceID!: string;

  @Field()
  authorRole!: string;

  @Field((type) => [String])
  pictures!: string[];

  @Field()
  text!: string;

  @Field((type) => [String])
  likedBy!: string[];

  @Field()
  start!: Date;

  @Field()
  end!: Date;
}
