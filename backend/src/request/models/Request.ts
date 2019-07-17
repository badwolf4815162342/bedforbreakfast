import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import { arrayProp, prop, Ref, Typegoose } from 'typegoose';
import { Rating, RoleType } from '../../rating/models/Rating';
import { User } from '../../users/models/User';

@ObjectType()
export class Request extends Typegoose {
  @Field((type) => ID)
  readonly _id!: ObjectId; // tslint:disable-line variable-name

  @Field((type) => Date)
  @prop({ required: true })
  start!: Date;

  @Field((type) => Date)
  @prop({ required: true })
  end!: Date;

  @Field((type) => User)
  @prop({ ref: User, required: true })
  receiver!: Ref<ObjectId>;

  @Field((type) => User)
  @prop({ ref: User, required: true })
  proposer!: Ref<ObjectId>;

  @Field((type) => String)
  @prop({ required: true })
  inRoleOf!: RoleType;

  @Field((type) => String)
  @prop({ required: true })
  requestStatus!: RequestStatus;

  @Field((type) => String)
  @prop({ required: true })
  description!: string;

  @Field((type) => [Rating])
  @arrayProp({ itemsRef: 'Rating' })
  ratings?: Array<Ref<ObjectId>>;
}

export type RequestStatus = 'REQUESTED' | 'ACCEPTED' | 'CANCELLED' | 'DENIED';
