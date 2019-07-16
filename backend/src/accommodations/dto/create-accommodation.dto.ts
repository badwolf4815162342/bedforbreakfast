import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AccommodationDto {
  @Field({ nullable: true })
  _id?: string; //tslint:disable-line

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

  @Field({ nullable: true })
  description?: string;

  @Field()
  numberOfBeds!: number;

  user!: ObjectId;
}
