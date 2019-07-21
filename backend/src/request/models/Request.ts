import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { arrayProp, prop, Ref, Typegoose } from 'typegoose';
import { Rating } from '../../rating/models/Rating';
import { TripReport } from '../../tripReport/models/TripReport';
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
  requestStatus!: RequestStatus;

  @Field((type) => String)
  @prop({ required: true })
  description!: string;

  @Field((type) => [Rating])
  @arrayProp({ itemsRef: 'Rating' })
  ratings?: Array<Ref<ObjectId>>;

  @Field((type) => [TripReport])
  @arrayProp({ itemsRef: 'TripReport' })
  tripReports?: Array<Ref<ObjectId>>;

  @Field((type) => Boolean)
  @prop({ required: true, default: false })
  notificationSeen!: boolean;
}

export enum RequestStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  CANCELLED = 'CANCELLED',
  DENIED = 'DENIED',
}

registerEnumType(RequestStatus, {
  name: 'requestStatus', // this one is mandatory
  description: 'The basic RequestStatus', // this one is optional
});
