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

import { ObjectId } from 'mongodb';
import { AccommodationsService } from '../accommodations/accommodations.service';
import { UsersService } from '../users/users.service';
import { CanBeRequestedDto } from './dto/can-be-requested.dto';
import { UpdateRequestStatusDto } from './dto/update-requestStatus.dto';

@Resolver((of: any) => {
  return Request;
})
export class RequestResolver {
  constructor(
    private readonly requestService: RequestService,
    @Inject(forwardRef(() => RatingService)) private readonly ratingService: RatingService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    private readonly accommodationsService: AccommodationsService,
  ) {}

  @Query((returns) => [Request])
  async requests(): Promise<Request[]> {
    return this.requestService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Request])
  async receivedRequestedRequests(@CurrentUser() user: User): Promise<Request[]> {
    return this.requestService.findByReceiverAndRequestedFromNow(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Request])
  async proposedAnsweredRequests(@CurrentUser() user: User): Promise<Request[]> {
    return this.requestService.findByProposerAndAnsweredFromNow(user._id);
  }

  async requestPossible(requestId: string, hostId: string, currentUserId: ObjectId): Promise<boolean> {
    const request = await this.requestService.findById(requestId);
    if (!request) {
      throw new Error('Invalid request ID');
    }
    // check if receiver exists
    const receiver = await this.usersService.findById(hostId);
    if (!receiver) {
      throw new Error('Invalid receiver ID');
    }
    // receiver is host
    if (!receiver.accommodation) {
      return false;
    }
    // receiver is active
    const accommodation = await this.accommodationsService.findById(receiver.accommodation);
    if (accommodation) {
      if (!accommodation.isActive) {
        return false;
      }
    }
    // check if you are not rating yourself
    if (receiver._id.equals(currentUserId)) {
      return false;
    }
    // check if you only rate once until receiver reacts on your last request
    if (
      (await this.requestService.findByReceiverAndProposerAndRequestedFromNow(receiver._id, currentUserId)).length > 0
    ) {
      return false;
    }
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Request)
  async createRequest(
    @Args('createRequestDto') createRequestDto: CreateRequestDto,
    @CurrentUser() proposer: User,
  ): Promise<Request> {
    if (!(await this.requestPossible)) {
      throw new Error('Requesting not possible');
    }
    // Date check
    const today = new Date();
    const startDate: Date = createRequestDto.start;
    const endDate: Date = createRequestDto.end;
    if (startDate < today) {
      throw new Error('You can not request for a start date in the past!');
    }
    if (endDate < startDate) {
      throw new Error('Start date has to be before end date!');
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
    // Date check
    const today = new Date();
    const endDate: Date = request.end;
    if (endDate > today) {
      throw new Error('You can not rate a request for a trip that has not happened yet!');
    }

    const newRate = await this.ratingService.create({ ...createRatingDto, author, receiver });

    // update the request
    const updatedRequest = await this.requestService.addRating(request, newRate);
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

  @UseGuards(GqlAuthGuard)
  @Query((returns) => Boolean)
  async canBeRequested(
    @Args('canBeRequestedDto') canBeRequestedDto: CanBeRequestedDto,
    @CurrentUser() user: User,
    // tslint:disable-next-line: ban-types
  ): Promise<Boolean> {
    return await this.requestPossible(canBeRequestedDto.requestId, canBeRequestedDto.hostId, user._id);
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
