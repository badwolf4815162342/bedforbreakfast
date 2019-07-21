import { forwardRef, Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { RequestService } from '../request/request.service';
import { User } from '../users/models/User';
import { UsersService } from '../users/users.service';
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
  async receivedRatings(@Args('userId') userId: string): Promise<TripReport[]> {
    return await this.tripReportService.findByReceiver(userId);
  }

  // @Mutation((returns) => TripReport)
  // async createTripReport(@Args('createTripReportDto') createTripReportDto: CreateTripReportDto): Promise<TripReport> {
  //   return await this.tripReportService.create(createTripReportDto);
  // }

  @ResolveProperty()
  async author(@Parent() tripReport: TripReport) {
    return await this.usersService.findById(tripReport.author);
  }

  @ResolveProperty()
  async recipient(@Parent() tripReport: TripReport) {
    return await this.usersService.findById(tripReport.recipient);
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
