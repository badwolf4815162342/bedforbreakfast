import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { CreateRequestDto } from './dto/create-request.dto';
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

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const createdRequest = new this.requestModel(createRequestDto);
    return await createdRequest.save();
  }
}
