import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Accommodation {
  @Field((type) => String)
  name!: string;

  @Field((type) => String)
  city!: string;
}
