import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { prop, Ref, Typegoose } from 'typegoose';
import { Request } from '../../request/models/Request';
import { User } from '../../users/models/User';

@ObjectType()
export class Rating extends Typegoose {
  @Field((type) => ID)
  readonly _id!: ObjectId; // tslint:disable-line variable-name

  @Field((type) => Request)
  @prop({ ref: Request, required: true })
  request!: Ref<ObjectId>;

  @Field((type) => User)
  @prop({ ref: User, required: true })
  author!: Ref<ObjectId>;

  @Field((type) => User)
  @prop({ ref: User, required: true })
  receiver!: Ref<ObjectId>;

  @Field((type) => Boolean)
  @prop({ required: true })
  rating!: boolean;

  @Field((type) => String)
  @prop({ required: true })
  description!: string;

  @Field((type) => RoleType)
  @prop({ required: true })
  receiverRole!: RoleType;
}

export enum RoleType {
  MEAL = 'MEAL',
  ACCOMMODATION = 'ACCOMMODATION',
}

registerEnumType(RoleType, {
  name: 'RoleType', // this one is mandatory
  description: 'The basic directions', // this one is optional
});
