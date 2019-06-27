import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AccommodationResolver } from './accommodations.resolver';
import { AccommodationsService } from './accommodations.service';
import { Accommodation } from './models/Accommodation';

@Module({
  imports: [TypegooseModule.forFeature([Accommodation])],
  providers: [AccommodationsService, AccommodationResolver],
})
export class AccommodationsModule {}