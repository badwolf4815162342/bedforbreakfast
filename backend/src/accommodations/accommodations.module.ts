import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccommodationSchema } from './accommodation.schema';
import { AccommodationResolver } from './accommodations.resolver';
import { AccommodationsService } from './accommodations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Accommodation', schema: AccommodationSchema },
    ]),
  ],
  providers: [AccommodationsService, AccommodationResolver],
})
export class AccommodationsModule {}
