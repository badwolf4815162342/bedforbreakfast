import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateTripReportDto } from './dto/create-trip-report.dto';
import { TripReport } from './models/TripReport';
import { TripReportService } from './tripReport.service';

@Resolver((of: any) => {
  return TripReport;
})
export class TripReportResolver {
  constructor(private readonly tripReportService: TripReportService) {}

  @Query((returns) => [TripReport])
  async tripReports(): Promise<TripReport[]> {
    return this.tripReportService.findAll();
  }

  @Mutation((returns) => TripReport)
  async createTripReport(@Args('createTripReportDto') createTripReportDto: CreateTripReportDto): Promise<TripReport> {
    return await this.tripReportService.create(createTripReportDto);
  }
}
