import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './models/Request';
import { ObjectId } from 'mongodb';
import { Rating } from '../rating/models/Rating';

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
      inRoleOf: request.inRoleOf,
      ratings: request.ratings,
      requestStatus: request.requestStatus,
    };
    (request.ratings as ObjectId[]).push(newRate._id);
    return this.requestModel.findByIdAndUpdate(request._id, newRequest);
  }
}
