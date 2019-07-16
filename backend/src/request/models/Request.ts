import { Field, ObjectType } from 'type-graphql';
import { prop, Typegoose } from 'typegoose';
import { RoleType } from '../../rating/models/Rating';

@ObjectType()
export class Request extends Typegoose {
  @Field((type) => Date)
  @prop({ required: true })
  start!: Date;

  @Field((type) => Date)
  @prop({ required: true })
  end!: Date;

  // TODO: receiver

  @Field((type) => String)
  @prop({ required: true })
  inRoleOf!: RoleType;

  @Field((type) => String)
  @prop({ required: true })
  requestStatus!: RequestStatus;

  @Field((type) => String)
  @prop({ required: true })
  description!: string;
}

export const RequestModel = new Request().getModelForClass(Request);

export type RequestStatus = 'REQUESTED' | 'ACCEPTED' | 'CANCELLED' | 'DENIED';
