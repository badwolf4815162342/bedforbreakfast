import { Args, Mutation, Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './models/Request';
import { RequestService } from './request.service';
import { GqlAuthGuard, User as CurrentUser } from '../authentication/guards/jwt.auth.guard';
import { CreateRatingDto } from '../rating/dto/create-rating.dto';
import { RatingService } from '../rating/rating.service';
import { UseGuards, forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { User } from '../users/models/User';
import { Rating } from '../rating/models/Rating';

import { UsersService } from '../users/users.service';

@Resolver((of: any) => {
  return Request;
})
export class RequestResolver {
  constructor(
    private readonly requestService: RequestService,
    @Inject(forwardRef(() => RatingService)) private readonly ratingService: RatingService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
  ) {}

  @Query((returns) => [Request])
  async requests(): Promise<Request[]> {
    return this.requestService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Request)
  async createRequest(
    @Args('createRequestDto') createRequestDto: CreateRequestDto,
    @CurrentUser() proposer: User,
  ): Promise<Request> {
    // check if receiver exists
    const receiver = await this.usersService.findById(createRequestDto.receiver);
    if (!receiver) {
      throw new Error('Invalid receiver ID');
    }
    if (receiver.isHost === false) {
      throw new Error('Receiver is not a Host!');
    }
    // if !(receiver.accomondation) {
    //   throw new Error('Receiver is not a Host!');
    //}
    if (receiver._id.equals(proposer._id)) {
      throw new Error('Receiver can not be same person as proposer of the request!');
    }

    // check if host is active in his accomondation if (receiver.accomondation)

    return await this.requestService.create({ ...createRequestDto, proposer });
  }

  // tslint:disable-next-line: max-line-length
  // Conditions: logged in as request.proposer or request.receiver Trip accepted, request date is before today, only 2 ratings possible receiverOfRequest,AuthorOfRequest
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Request)
  async createRating(
    @Args('createRatingDto') createRatingDto: CreateRatingDto,
    @CurrentUser() author: User,
  ): Promise<Request> {
    // find the recipe
    const request = await this.requestService.findById(createRatingDto.request);
    if (!request) {
      throw new Error('Invalid request ID');
    }

    const newRate = await this.ratingService.create({ ...createRatingDto, author });

    // update the recipe
    const updatedRequest = await this.requestService.alterRatings(request, newRate);
    if (!updatedRequest) {
      throw new NotFoundException(request._id);
    }
    return updatedRequest;
  }

  @ResolveProperty()
  async ratings(@Parent() request: Request) {
    const ratings: Rating[] = [];
    if (request.ratings) {
      request.ratings.forEach(async (ratingId) => {
        const rating = await this.ratingService.findById(ratingId);
        if (rating) {
          ratings.push(rating);
        }
      });
      return ratings;
    }
  }

  @ResolveProperty()
  async receiver(@Parent() request: Request) {
    return await this.usersService.findById(request.receiver);
  }
}
