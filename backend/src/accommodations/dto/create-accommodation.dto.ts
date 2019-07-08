import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateAccommodationDto {
  @Field()
  country!: string;

  @Field()
  streetName!: string;

  @Field()
  streetNumber!: string;

  @Field()
  zipCode!: string;

  @Field()
  city!: string;

  @Field()
  description!: string;

  @Field()
  numberOfBeds!: number;
}
