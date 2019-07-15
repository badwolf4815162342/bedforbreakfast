import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsRoleType } from '../../common/validators/roleTypeValidator';
import { Rating, RoleType } from '../models/Rating';
import { ObjectId } from 'mongodb';
import { User } from 'src/user/models/User';

@InputType()
export class CreateRatingDto implements Partial<Rating> {
  @Field()
  @IsRoleType('Given ($value) is not a Role Type (MEAL or ACCOMMONDATION)!')
  receiverRole!: RoleType;

  @Field()
  @IsNotEmpty()
  description!: string;

  @Field()
  rating!: boolean;
}
