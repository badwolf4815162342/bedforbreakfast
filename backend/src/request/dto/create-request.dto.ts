import { IsNotEmpty } from 'class-validator';
import { RoleType } from 'src/rating/models/Rating';
import { Field, InputType } from 'type-graphql';
import { IsRoleType } from '../../common/validators/roleTypeValidator';
import { Request, RequestStatus } from '../models/Request';

@InputType()
export class CreateRequestDto implements Partial<Request> {
  @Field()
  start!: Date;

  @Field()
  end!: Date;

  @Field()
  @IsRoleType('Given ($value) is not a Role Type (MEAL or ACCOMMONDATION)!')
  inRoleOf!: RoleType;

  @Field()
  @IsNotEmpty()
  description!: string;

  @Field()
  // TODO: Validator
  requestStatus!: RequestStatus;
}
