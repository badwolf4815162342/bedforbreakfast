import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AccommodationDto {
  @Field({ nullable: true })
  _id?: string; //tslint:disable-line

  @Field()
  isActive!: boolean;

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

  @Field({ nullable: true })
  district?: string;

  @Field()
  numberOfBeds!: number;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  pictures?: string[];

  user!: ObjectId;
}
