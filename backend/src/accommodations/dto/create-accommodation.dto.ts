import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateAccommodationDto {
  @Field()
  name!: string;

  @Field()
  city!: string;
}
