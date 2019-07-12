import { Field, InputType } from 'type-graphql';

@InputType()
export class AccommodationDto {
  @Field()
  _id!: string; //tslint:disable-line

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
