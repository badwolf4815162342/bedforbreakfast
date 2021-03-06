import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { ObjectId } from 'mongodb';
import { Rating } from './models/Rating';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating)
    private readonly ratingModel: ModelType<Rating>,
  ) {}

  async findAll(): Promise<Rating[]> {
    return await this.ratingModel.find().exec();
  }

  async create(createRatingDto: {}): Promise<Rating> {
    const createdRating = new this.ratingModel(createRatingDto);
    return await createdRating.save();
  }

  async findById(id: ObjectId): Promise<Rating | null> {
    return this.ratingModel.findById(id);
  }

  async findByReceiver(receiverId: ObjectId | string): Promise<Rating[]> {
    return this.ratingModel.find({ receiver: receiverId }).exec();
  }
}
