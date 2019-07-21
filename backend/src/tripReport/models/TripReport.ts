import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import { arrayProp, prop, Ref, Typegoose } from 'typegoose';
import { RoleType } from '../../rating/models/Rating';
import { Request } from '../../request/models/Request';
import { User } from '../../users/models/User';

@ObjectType()
export class TripReport extends Typegoose {
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

  @Field((type) => RoleType)
  @prop({ required: true })
  receiverRole!: RoleType;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @prop()
  pictures?: string[];

  @Field((type) => String)
  @prop({ required: true })
  description!: string;

  @Field((type) => [User])
  @arrayProp({ itemsRef: 'User' })
  likedBy?: Array<Ref<ObjectId>>;
}
