import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ObjectId } from 'mongodb';
import { Arg } from 'type-graphql';
import { ObjectIdScalar } from '../common/scalars/object-id.scalar';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating, RatingModel } from './models/Rating';
import { RatingService } from './rating.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Resolver((of: any) => {
  return Rating;
})
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Query((returns) => [Rating])
  async ratings(): Promise<Rating[]> {
    return this.ratingService.findAll();
  }

  @Mutation((returns) => Rating)
  async createRating(@Args('createRatingDto') createRatingDto: CreateRatingDto): Promise<Rating> {
    return await this.ratingService.create(createRatingDto);
  }
}
