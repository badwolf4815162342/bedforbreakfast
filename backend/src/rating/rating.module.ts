import { forwardRef, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RequestModule } from '../request/request.module';
import { UsersModule } from '../users/users.module';
import { Rating } from './models/Rating';
import { RatingResolver } from './rating.resolver';
import { RatingService } from './rating.service';
@Module({
  imports: [TypegooseModule.forFeature([Rating]), forwardRef(() => RequestModule), forwardRef(() => UsersModule)],
  providers: [RatingService, RatingResolver],
  exports: [RatingService],
})
export class RatingModule {}
