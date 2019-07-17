import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from './models/Rating';
import { RatingService } from './rating.service';

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
