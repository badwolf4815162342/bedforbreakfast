import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { ObjectId } from 'mongodb';
import { Rating } from '../rating/models/Rating';
import { TripReport } from '../tripReport/models/TripReport';
import { Request, RequestStatus } from './models/Request';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request)
    private readonly requestModel: ModelType<Request>,
  ) {}

  async findAll(): Promise<Request[]> {
    return await this.requestModel.find().exec();
  }

  async findById(id: ObjectId | string): Promise<Request | null> {
    return this.requestModel.findById(id).exec();
  }

  async findByReceiverAndProposerAndRequestedFromNow(
    receiverId: ObjectId | string,
    proposerId: ObjectId | string,
  ): Promise<Request[]> {
    return this.requestModel
      .find({
        receiver: receiverId,
        proposer: proposerId,
        requestStatus: RequestStatus.REQUESTED,
        start: { $gte: new Date() },
      })
      .exec();
  }

  async findByReceiverAndRequestedFromNow(receiverId: ObjectId | string): Promise<Request[]> {
    return this.requestModel
      .find({ receiver: receiverId, requestStatus: RequestStatus.REQUESTED, start: { $gte: new Date() } })
      .exec();
  }

  async findByProposerAndAnsweredFromNow(proposerId: ObjectId | string): Promise<Request[]> {
    return this.requestModel
      .find({
        proposer: proposerId,
        requestStatus: { $ne: RequestStatus.REQUESTED },
        start: { $gte: new Date() },
      })
      .exec();
  }

  async create(createRequestDto: {}): Promise<Request> {
    const createdRequest = new this.requestModel(createRequestDto);
    createdRequest.requestStatus = RequestStatus.REQUESTED; // always first status when creating
    return await createdRequest.save();
  }

  async addRating(request: Request, newRate: Rating): Promise<Request | null> {
    const newRequest = {
      ratings: request.ratings,
    };
    (request.ratings as ObjectId[]).push(newRate._id);
    return this.requestModel.findByIdAndUpdate(request._id, newRequest);
  }

  async addTripReport(request: Request, newReport: TripReport): Promise<Request | null> {
    const newRequest = {
      tripReports: request.tripReports,
    };
    (request.tripReports as ObjectId[]).push(newReport._id);
    return this.requestModel.findByIdAndUpdate(request._id, newRequest);
  }

  async changeRequestStatus(oldRequest: Request, requestStatusNew: RequestStatus): Promise<Request | null> {
    const request = {
      requestStatus: requestStatusNew,
    };
    return this.requestModel.findByIdAndUpdate(oldRequest._id, request);
  }
}
