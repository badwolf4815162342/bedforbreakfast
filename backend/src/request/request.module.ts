import { forwardRef, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AccommodationsModule } from '../accommodations/accommodations.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { RatingModule } from '../rating/rating.module';
import { TripReportModule } from '../tripReport/tripReport.module';
import { UsersModule } from '../users/users.module';
import { Request } from './models/Request';
import { RequestResolver } from './request.resolver';
import { RequestService } from './request.service';

@Module({
  imports: [
    TypegooseModule.forFeature([Request]),
    AuthenticationModule,
    forwardRef(() => UsersModule),
    forwardRef(() => RatingModule),
    forwardRef(() => TripReportModule),
    AccommodationsModule,
  ],
  providers: [RequestService, RequestResolver],
  exports: [RequestService],
})
export class RequestModule {}
