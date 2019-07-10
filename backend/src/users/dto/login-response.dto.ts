import { Field, ObjectType } from 'type-graphql';

import { User } from '../models/User';

@ObjectType()
export class LoginResponseTo {
  @Field()
  token!: string;

  @Field()
  user!: User;
}
