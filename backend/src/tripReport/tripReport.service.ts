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

  async findById(id: ObjectId | string): Promise<TripReport | null> {
    return this.tripReportModel.findById(id);
  }

  async addLike(tripReport: TripReport, userId: ObjectId): Promise<TripReport | null> {
    const newTripReport = {
      likedBy: tripReport.likedBy,
    };
    (newTripReport.likedBy as ObjectId[]).push(userId);
    return this.tripReportModel.findByIdAndUpdate(tripReport._id, newTripReport);
  }

  async findByAuthor(authorId: ObjectId | string): Promise<TripReport[]> {
    return this.tripReportModel.find({ author: authorId }).exec();
  }
}
