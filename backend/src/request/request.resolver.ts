import { forwardRef, HttpException, HttpStatus, Inject, NotFoundException, UseGuards } from '@nestjs/common';
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
import { CreateTripReportDto } from '../tripReport/dto/create-trip-report.dto';
import { TripReport } from '../tripReport/models/TripReport';
import { TripReportService } from '../tripReport/tripReport.service';
import { UsersService } from '../users/users.service';
import { CanBeRequestedDto } from './dto/can-be-requested.dto';
import { RequestSeenDto } from './dto/request-seen.dto';
import { UpdateRequestStatusDto } from './dto/update-requestStatus.dto';

@Resolver((of: any) => {
  return Request;
})
export class RequestResolver {
  constructor(
    private readonly requestService: RequestService,
    @Inject(forwardRef(() => RatingService)) private readonly ratingService: RatingService,
    @Inject(forwardRef(() => TripReportService)) private readonly tripReportService: TripReportService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    private readonly accommodationsService: AccommodationsService,
  ) {}

  // TODO: should not be callable from normal user
  @Query((returns) => [Request])
  async requests(): Promise<Request[]> {
    return this.requestService.findAll();
  }

  @Query((returns) => Request)
  async request(@Args('requestId') id: string): Promise<Request> {
    const request = await this.requestService.findById(id);
    if (!request) {
      throw new NotFoundException(id);
    }
    return request;
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Request])
  async receivedRequestedRequests(@CurrentUser() user: User): Promise<Request[]> {
    return this.requestService.findByReceiverAndRequestedFromNow(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Request])
  async proposedUnseeAnsweredRequests(@CurrentUser() user: User): Promise<Request[]> {
    return this.requestService.findByProposerAndAnsweredAndUnseenFromNow(user._id);
  }

  // TODO: is this one used
  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Request])
  async proposedAnsweredRequests(@CurrentUser() user: User): Promise<Request[]> {
    return this.requestService.findByProposerAndAnsweredFromNow(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Request])
  async acceptedUnratedPastRequests(@CurrentUser() user: User): Promise<Request[]> {
    const requests = await this.requestService.findByProposerOrReceiverAndAcceptedInPast(user._id);
    const requestNotYetRated: Request[] = [];
    if (requests) {
      await Promise.all(
        requests.map(async (request) => {
          // console.log(this.shouldBeRated(request, user._id));
          if (await this.shouldBeRated(request, user._id)) {
            requestNotYetRated.push(request);
          }
        }),
      );
    }
    return requestNotYetRated;
  }

  async shouldBeRated(request: Request, currentUserId: ObjectId): Promise<boolean> {
    let shouldBeRated = true;
    const ratings = await this.getRatings(request);
    ratings.forEach((rating) => {
      if (rating.author.equals(currentUserId)) {
        shouldBeRated = false;
      }
    });
    return shouldBeRated;
  }

  async getRatings(request: Request): Promise<Rating[]> {
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
    return ratingsOfRequest;
  }

  async ratingOrReportPossible(request: Request, currentUserId: ObjectId): Promise<boolean> {
    // ony accepted requests can be rated/trip reported
    if (!(request.requestStatus === RequestStatus.ACCEPTED)) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'It is not possible to rate or write trip report for unaccepted requests.',
        },
        409,
      );
    }
    // Date check
    const today = new Date();
    const endDate: Date = request.end;
    if (endDate > today) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'It is not possible to rate a request or write a trip report for it if it has not happened yet.',
        },
        409,
      );
    }
    return true;
  }

  async requestPossible(hostId: string, currentUserId: ObjectId): Promise<boolean> {
    // check if receiver exists
    const receiver = await this.usersService.findById(hostId);
    if (!receiver) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Receiver id not found.',
        },
        404,
      );
    }
    // receiver is host
    if (!receiver.accommodation) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'It is not possible to request a host who has no accommodation.',
        },
        409,
      );
    }
    // receiver is active
    const accommodation = await this.accommodationsService.findById(receiver.accommodation);
    if (accommodation) {
      if (!accommodation.isActive) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            error: 'It is not possible to request a host who s accommodation is not active.',
          },
          409,
        );
      }
    }
    // check if you are not request yourself
    if (receiver._id.equals(currentUserId)) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'It is not possible to request yourself.',
        },
        409,
      );
    }
    // check if you only rate once until receiver reacts on your last request
    if (
      (await this.requestService.findByReceiverAndProposerAndRequestedFromNow(receiver._id, currentUserId)).length > 0
    ) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error:
            'It is not possible to request again until the host has react on your last request or your las request has expired.',
        },
        409,
      );
    }
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Request)
  async createRequest(
    @Args('createRequestDto') createRequestDto: CreateRequestDto,
    @CurrentUser() proposer: User,
  ): Promise<Request> {
    if (!(await this.requestPossible(createRequestDto.receiver, proposer._id))) {
      throw new Error('Requesting not possible');
    }
    // Date check
    const today = new Date();
    const startDate: Date = createRequestDto.start;
    const endDate: Date = createRequestDto.end;
    if (startDate < today) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'It is not possible to request a host for start date in the past.',
        },
        409,
      );
    }
    if (endDate < startDate) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'It is not possible to request a trip with for start date after end date.',
        },
        409,
      );
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
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Request id not found.',
        },
        404,
      );
    }
    if (!(await this.ratingOrReportPossible(request, author._id))) {
      throw new Error('Rating not possible');
    }
    const ratingsOfRequest: Rating[] = await this.getRatings(request);
    // only to ratings per request, one for host, one for guest
    if (request.ratings) {
      if (ratingsOfRequest.length > 1) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            error: 'It is not possible to rate this request because it is already rated by guest and host.',
          },
          409,
        );
      }
    }
    // if you already rated
    if (ratingsOfRequest.length > 0 && ratingsOfRequest[0].author.equals(author._id)) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'It is not possible to rate this request again.',
        },
        409,
      );
    }
    let receiver: User | null = null;
    let receiverRole: RoleType | null = null;
    // you should have proposed the request
    if (request.proposer.equals(author._id)) {
      // if so you are rating in role of the guest/meal so receiver is in role of accommodation
      receiverRole = RoleType.ACCOMMODATION;
      // then the receiver of this rating is the receiver of the request
      receiver = await this.usersService.findById(request.receiver);
      // or you should have received+accepted the request
    } else if (request.receiver.equals(author._id)) {
      // if so you are rating in role of host/accommodation so receiver is in role of MEAL
      receiverRole = RoleType.MEAL;
      // you as host create a rating for guest(proposer of request)
      receiver = await this.usersService.findById(request.proposer);
    } else {
      // in any other cae you are not allowed to create a rating
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error:
            // tslint:disable-next-line: max-line-length
            'It is not possible to rate this request if you are not the receiver or proposer of the corresponding request.',
        },
        403,
      );
    }

    const newRate = await this.ratingService.create({ ...createRatingDto, author, receiver, receiverRole });

    // update the request
    const updatedRequest = await this.requestService.addRating(request, newRate);
    if (!updatedRequest) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Updated request not found.',
        },
        404,
      );
    }
    // update rating value for user
    if (!receiver) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Receiver id not found.',
        },
        404,
      );
    }
    await this.usersService.alterLikes(receiver, newRate.rating, author);
    return updatedRequest;
  }

  // tslint:disable-next-line: max-line-length
  // Conditions: logged in as request.proposer or request.receiver Trip accepted, request date is before today, only 2 ratings possible receiverOfRequest,AuthorOfRequest
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Request)
  async createTripReport(
    @Args('createTripReportDto') createTripReportDto: CreateTripReportDto,
    @CurrentUser() author: User,
  ): Promise<Request> {
    // find the request
    const request = await this.requestService.findById(createTripReportDto.request);
    if (!request) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Request id not found.',
        },
        404,
      );
    }
    if (!(await this.ratingOrReportPossible(request, author._id))) {
      throw new Error('Trip report writing not possible.');
    }
    const reportsOfRequest: TripReport[] = [];
    if (request.tripReports) {
      await Promise.all(
        request.tripReports.map(async (tripReportId) => {
          const tripReport = await this.tripReportService.findById(tripReportId);
          if (tripReport) {
            reportsOfRequest.push(tripReport);
          }
        }),
      );
    }
    // only two trip reports per request, one for host, one for guest
    if (request.tripReports) {
      if (reportsOfRequest.length > 1) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            error:
              'It is not possible to write a trip report for this request because it is already rated by guest and host.',
          },
          409,
        );
      }
    }
    // if you already wrote a trip report
    if (reportsOfRequest.length > 0 && reportsOfRequest[0].author.equals(author._id)) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'It is not possible to write a second trip report for the same request.',
        },
        409,
      );
    }

    let receiver: User | null = null;
    let receiverRole: RoleType | null = null;
    // you should have proposed the request
    if (request.proposer.equals(author._id)) {
      // if so you are trip reporting  in role of the guest/meal so receiver is in role of accommodation
      receiverRole = RoleType.ACCOMMODATION;
      // then the receiver of this Trip report is the receiver of the request
      receiver = await this.usersService.findById(request.receiver);
      // or you should have received+accepted the request
    } else if (request.receiver.equals(author._id)) {
      // if so you are trip reporting in role of host/accommodation so receiver is in role of MEAL
      receiverRole = RoleType.MEAL;
      // you as host create a trip reporting for guest(proposer of request)
      receiver = await this.usersService.findById(request.proposer);
    } else {
      // in any other cae you are not allowed to create a trip report
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error:
            // tslint:disable-next-line: max-line-length
            'It is not possible to write a trip report for this request if you are not the receiver or proposer of the corresponding request.',
        },
        403,
      );
    }
    let newReport: TripReport | null = await this.tripReportService.create({
      ...createTripReportDto,
      author,
      receiver,
      receiverRole,
    });

    if (createTripReportDto.pictures) {
      newReport = await this.tripReportService.addPictures(newReport, createTripReportDto.pictures);
    }
    if (!newReport) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Updated trip report not found.',
        },
        404,
      );
    }
    // update the request
    const updatedRequest = await this.requestService.addTripReport(request, newReport);

    if (!updatedRequest) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Updated request not found.',
        },
        404,
      );
    }
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
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Request id not found.',
        },
        404,
      );
    }
    if (!request.receiver.equals(user._id)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'It is not possible to update request if a user is not the receiver of this request.',
        },
        403,
      );
    }
    request.requestStatus = updateRequestStatusDto.requestStatus;
    const updatedRequest = await this.requestService.changeRequestStatus(request, updateRequestStatusDto.requestStatus);
    if (!updatedRequest) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Updated request not found.',
        },
        404,
      );
    }
    return request;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Request)
  async updateRequestAsSeen(
    @Args('requestSeenDto') requestSeenDto: RequestSeenDto,
    @CurrentUser() user: User,
  ): Promise<Request> {
    const request = await this.requestService.findById(requestSeenDto._id);
    if (!request) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Request id not found.',
        },
        404,
      );
    }
    if (!request.proposer.equals(user._id)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'It is not possible to set request as seen if a user is not the proposer of this request.',
        },
        403,
      );
    }
    request.notificationSeen = true;
    const updatedRequest = await this.requestService.changeRequestAsSeen(request);
    if (!updatedRequest) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Updated request not found.',
        },
        404,
      );
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
    const receiver = await this.usersService.findById(canBeRequestedDto.hostId);
    if (!receiver) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Receiver id not found.',
        },
        404,
      );
    }
    try {
      await this.requestPossible(canBeRequestedDto.hostId, user._id);
    } catch (e) {
      return false;
    }
    return true;
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
  async tripReports(@Parent() request: Request) {
    const tripReports: TripReport[] = [];
    if (request.tripReports) {
      await Promise.all(
        request.tripReports.map(async (tripReportId) => {
          const tripReport = await this.tripReportService.findById(tripReportId);
          if (tripReport) {
            tripReports.push(tripReport);
          }
        }),
      );
    }
    return tripReports;
  }

  @ResolveProperty()
  async receiver(@Parent() request: Request) {
    return await this.usersService.findById(request.receiver);
  }

  @ResolveProperty()
  async proposer(@Parent() request: Request) {
    return await this.usersService.findById(request.proposer);
  }
}
