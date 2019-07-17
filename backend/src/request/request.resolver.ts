import { forwardRef, Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard, User as CurrentUser } from '../authentication/guards/jwt.auth.guard';
import { CreateRatingDto } from '../rating/dto/create-rating.dto';
import { Rating } from '../rating/models/Rating';
import { RatingService } from '../rating/rating.service';
import { User } from '../users/models/User';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request, RequestStatus } from './models/Request';
import { RequestService } from './request.service';

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
    if (!receiver.accommodation) {
      throw new Error('Receiver has no Accommodation, so he is not a Host and you want to rate him as a guest!');
    }

    // check if you are not rating yourself
    if (receiver._id.equals(proposer._id)) {
      throw new Error('Receiver can not be same person as proposer of the request!');
    }
    // check if you only rate once
    if ((await this.requestService.findByReceiverAndProposer(receiver._id, proposer._id)).length > 0) {
      throw new Error('You already requested this accommodation!');
    }

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

  @Mutation((returns) => Request)
  async updateRequestStatus(
    @Args('id')
    id: string,
    @Args('requestStatus')
    requestStatus: RequestStatus,
    @CurrentUser() user: User,
  ): Promise<Request> {
    const request = await this.requestService.findById(id);
    if (!request) {
      throw new Error('Invalid request ID');
    }
    // if (request.receiver.equals(user._id)) {
    //  throw new Error('You can only change requests proposed to you!');
    // }
    if (
      !(
        requestStatus.toString() === 'ACCEPTED' ||
        requestStatus.toString() === 'CANCELLED' ||
        requestStatus.toString() === 'DENIED'
      )
    ) {
      throw new Error('Not a valid requestState try ACCEPTED or CANCELLED or DENIED');
    }
    request.requestStatus = requestStatus;
    const updatedRequest = await this.requestService.change(request);
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
