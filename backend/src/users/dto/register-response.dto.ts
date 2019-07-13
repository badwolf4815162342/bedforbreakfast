import { Field, ObjectType } from 'type-graphql';

import { User } from '../models/User';

@ObjectType()
export class RegisterResponseTo {
  @Field()
  token!: string;

  @Field()
  user!: User;
}
