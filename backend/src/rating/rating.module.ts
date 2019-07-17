import { Module, forwardRef } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from '../users/users.module';
import { Rating } from './models/Rating';
import { RatingResolver } from './rating.resolver';
import { RatingService } from './rating.service';
import { RequestModule } from '../request/request.module';
@Module({
  imports: [TypegooseModule.forFeature([Rating]), forwardRef(() => RequestModule), forwardRef(() => UsersModule)],
  providers: [RatingService, RatingResolver],
  exports: [RatingService],
})
export class RatingModule {}
