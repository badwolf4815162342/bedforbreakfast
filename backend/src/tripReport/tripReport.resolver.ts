import { forwardRef, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard, User as CurrentUser } from '../authentication/guards/jwt.auth.guard';
import { RequestService } from '../request/request.service';
import { User } from '../users/models/User';
import { UsersService } from '../users/users.service';
import { LikeTripReportDto } from './dto/like-trip-report.dto';
import { TripReport } from './models/TripReport';
import { TripReportService } from './tripReport.service';

@Resolver((of: any) => {
  return TripReport;
})
export class TripReportResolver {
  constructor(
    private readonly tripReportService: TripReportService,

    @Inject(forwardRef(() => RequestService)) private readonly requestService: RequestService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
  ) {}

  @Query((returns) => [TripReport])
  async tripReports(): Promise<TripReport[]> {
    return this.tripReportService.findAll();
  }

  @Query((returns) => [TripReport])
  async publishedTripReports(@Args('userId') userId: string): Promise<TripReport[]> {
    return await this.tripReportService.findByAuthor(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => TripReport)
  async likeTripReport(
    @CurrentUser() user: User,
    @Args('likeTripReportDto') likeTripReportDto: LikeTripReportDto,
  ): Promise<TripReport> {
    const tripReport = await this.tripReportService.findById(likeTripReportDto._id);
    if (!tripReport) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'TripReport id not found.',
        },
        404,
      );
    }
    if (tripReport.likedBy) {
      if (tripReport.likedBy.includes(user._id)) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'It is not possible to like a trip report more than once.',
          },
          403,
        );
      }
    }
    const updatedTripReport = await this.tripReportService.addLike(tripReport, user._id);
    if (!updatedTripReport) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Updated tripReport id not found.',
        },
        404,
      );
    }
    return updatedTripReport;
  }

  @ResolveProperty()
  async author(@Parent() tripReport: TripReport) {
    return await this.usersService.findById(tripReport.author);
  }

  @ResolveProperty()
  async receiver(@Parent() tripReport: TripReport) {
    return await this.usersService.findById(tripReport.receiver);
  }

  @ResolveProperty()
  async request(@Parent() tripReport: TripReport) {
    return await this.requestService.findById(tripReport.request);
  }

  @ResolveProperty()
  async likedBy(@Parent() tripReport: TripReport) {
    const likedBy: User[] = [];
    if (tripReport.likedBy) {
      await Promise.all(
        tripReport.likedBy.map(async (likeUserId) => {
          const like = await this.usersService.findById(likeUserId);
          if (like) {
            likedBy.push(like);
          }
        }),
      );
    }
    return likedBy;
  }
}
