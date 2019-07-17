import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { ObjectId } from 'mongodb';
import { Rating } from '../rating/models/Rating';
import { Request } from './models/Request';

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

  async findByReceiverAndProposer(receiverId: ObjectId | string, proposerId: ObjectId | string): Promise<Request[]> {
    return this.requestModel.find({ receiver: receiverId, proposer: proposerId }).exec();
  }

  async create(createRequestDto: {}): Promise<Request> {
    const createdRequest = new this.requestModel(createRequestDto);
    createdRequest.requestStatus = 'REQUESTED'; // always first status when creating
    return await createdRequest.save();
  }

  async alterRatings(request: Request, newRate: Rating): Promise<Request | null> {
    const newRequest = {
      start: request.start,
      end: request.end,
      description: request.description,
      ratings: request.ratings,
      requestStatus: request.requestStatus,
    };
    (request.ratings as ObjectId[]).push(newRate._id);
    return this.requestModel.findByIdAndUpdate(request._id, newRequest);
  }

  async change(oldRequest: Request): Promise<Request | null> {
    const request = {
      start: oldRequest.start,
      end: oldRequest.end,
      description: oldRequest.description,
      ratings: oldRequest.ratings,
      requestStatus: oldRequest.requestStatus,
    };
    return this.requestModel.findByIdAndUpdate(oldRequest._id, request);
  }
}
