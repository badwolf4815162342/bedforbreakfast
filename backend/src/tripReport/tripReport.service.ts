import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
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

  async create(createTripReportDto: {}): Promise<TripReport> {
    const createdTripReport = new this.tripReportModel(createTripReportDto);
    return await createdTripReport.save();
  }

  async findById(id: ObjectId): Promise<TripReport | null> {
    return this.tripReportModel.findById(id);
  }

  async findByAuthor(authorId: ObjectId | string): Promise<TripReport[]> {
    return this.tripReportModel.find({ author: authorId }).exec();
  }
}
