import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { TripReport } from './models/TripReport';
import { TripReportResolver } from './tripReport.resolver';
import { TripReportService } from './tripReport.service';

@Module({
  imports: [TypegooseModule.forFeature([TripReport])],
  providers: [TripReportService, TripReportResolver],
})
export class TripReportModule {}
