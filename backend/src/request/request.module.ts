import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { Request } from './models/Request';
import { RequestResolver } from './request.resolver';
import { RequestService } from './request.service';

@Module({
  imports: [TypegooseModule.forFeature([Request])],
  providers: [RequestService, RequestResolver],
})
export class RequestModule {}
