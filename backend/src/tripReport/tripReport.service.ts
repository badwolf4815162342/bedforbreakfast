import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { CreateTripReportDto } from './dto/create-trip-report.dto';
import { TripReport } from './models/TripReport';

@Injectable()
export class TripReportService {
  constructor(
    @InjectModel(TripReport)
    private readonly tripReportModel: ModelType<TripReport>,
  ) {}

  async findAll(): Promise<TripReport[]> {
    return await this.tripReportModel.find().exec();
  }

  async create(createTripReportDto: CreateTripReportDto): Promise<TripReport> {
    const createdTripReport = new this.tripReportModel(createTripReportDto);
    return await createdTripReport.save();
  }
}
