import { Module, forwardRef } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { Request } from './models/Request';
import { RequestResolver } from './request.resolver';
import { RequestService } from './request.service';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../users/users.module';
import { RatingModule } from '../rating/rating.module';

@Module({
  imports: [
    TypegooseModule.forFeature([Request]),
    AuthenticationModule,
    forwardRef(() => UsersModule),
    forwardRef(() => RatingModule),
  ],
  providers: [RequestService, RequestResolver],
  exports: [RequestService],
})
export class RequestModule {}
