import { IsNotEmpty } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from 'src/common/types/Upload';
import { Field, InputType } from 'type-graphql';
import { IsRoleType } from '../../common/validators/roleTypeValidator';
import { RoleType } from '../../rating/models/Rating';

@InputType()
export class CreateTripReportDto {
  @Field({ nullable: true })
  _id?: string; //tslint:disable-line

  @Field()
  request!: string;

  @Field((type) => RoleType)
  @IsRoleType('Given ($value) is not a Role Type (MEAL or ACCOMMODATION)!')
  receiverRole!: RoleType;

  @Field()
  @IsNotEmpty()
  description!: string;

  @Field((type) => [GraphQLUpload], { nullable: 'itemsAndList' })
  pictures?: Upload[];
}
