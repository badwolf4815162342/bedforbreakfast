import { forwardRef, Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard, User as CurrentUser } from '../authentication/guards/jwt.auth.guard';
import { CreateRatingDto } from '../rating/dto/create-rating.dto';
import { Rating, RoleType } from '../rating/models/Rating';
import { RatingService } from '../rating/rating.service';
import { User } from '../users/models/User';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request, RequestStatus } from './models/Request';
import { RequestService } from './request.service';

import { UsersService } from '../users/users.service';
import { UpdateRequestStatusDto } from './dto/update-requestStatus.dto';

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
    // TODO: if user is active
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
    // TODO: Date check

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
    // find the request
    const request = await this.requestService.findById(createRatingDto.request);
    if (!request) {
      throw new Error('Invalid request ID');
    }
    // ony accepted requests can be rated
    if (!(request.requestStatus === RequestStatus.ACCEPTED)) {
      throw new Error('Only accepted requests can be rated!');
    }
    const ratingsOfRequest: Rating[] = [];
    if (request.ratings) {
      await Promise.all(
        request.ratings.map(async (ratingId) => {
          const rating = await this.ratingService.findById(ratingId);
          if (rating) {
            ratingsOfRequest.push(rating);
          }
        }),
      );
    }
    // only to ratings per request, one for host, one for guest
    if (request.ratings) {
      if (ratingsOfRequest.length > 1) {
        throw new Error('This requests trip has already been rated by guest and host!');
      }
    }
    // if you already rated
    if (ratingsOfRequest.length > 0 && ratingsOfRequest[0].author.equals(author._id)) {
      throw new Error('You already rated this request!');
    }
    let receiver: User | null = null;
    // You want to rate the host
    if (createRatingDto.receiverRole === RoleType.ACCOMMODATION) {
      // you should have proposed the request
      if (!request.proposer.equals(author._id)) {
        throw new Error('You are not the proposer of this request so you can not rate in role of guest!');
      }
      // you as guest create a rating for host(receiver of request)
      receiver = await this.usersService.findById(request.receiver);
    }
    // You want to rate the guest/meal
    if (createRatingDto.receiverRole === RoleType.MEAL) {
      // you should have received+accepted the request
      if (!request.receiver.equals(author._id)) {
        throw new Error('You are not the receiver of this request so you can not rate in role of host!');
      }
      // you as host create a rating for guest(proposer of request)
      receiver = await this.usersService.findById(request.proposer);
    }
    // TODO: Date check

    const newRate = await this.ratingService.create({ ...createRatingDto, author, receiver });

    // update the recipe
    const updatedRequest = await this.requestService.alterRatings(request, newRate);
    if (!updatedRequest) {
      throw new NotFoundException(request._id);
    }
    // update rating value for user
    if (!receiver) {
      throw new Error('User to update rating for not found!');
    }
    await this.usersService.alterLikes(receiver, newRate.rating, author);
    return updatedRequest;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Request)
  async updateRequestStatus(
    @Args('updateRequestStatusDto') updateRequestStatusDto: UpdateRequestStatusDto,
    @CurrentUser() user: User,
  ): Promise<Request> {
    const request = await this.requestService.findById(updateRequestStatusDto._id);
    if (!request) {
      throw new Error('Invalid request ID');
    }
    if (!request.receiver.equals(user._id)) {
      throw new Error('You can only update requests send to you!');
    }
    request.requestStatus = updateRequestStatusDto.requestStatus;
    const updatedRequest = await this.requestService.changeRequestStatus(request, updateRequestStatusDto.requestStatus);
    if (!updatedRequest) {
      throw new NotFoundException(request._id);
    }
    return request;
  }

  @ResolveProperty()
  async ratings(@Parent() request: Request) {
    const ratings: Rating[] = [];
    if (request.ratings) {
      await Promise.all(
        request.ratings.map(async (ratingId) => {
          const rating = await this.ratingService.findById(ratingId);
          if (rating) {
            ratings.push(rating);
          }
        }),
      );
    }
    return ratings;
  }

  @ResolveProperty()
  async receiver(@Parent() request: Request) {
    return await this.usersService.findById(request.receiver);
  }
}
