import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { Rating } from './models/Rating';
import { RatingResolver } from './rating.resolver';
import { RatingService } from './rating.service';

@Module({
  imports: [TypegooseModule.forFeature([Rating])],
  providers: [RatingService, RatingResolver],
})
export class RatingModule {}
