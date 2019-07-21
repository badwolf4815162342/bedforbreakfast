import { forwardRef, Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { RequestService } from '../request/request.service';
import { UsersService } from '../users/users.service';
import { Rating } from './models/Rating';
import { RatingService } from './rating.service';

@Resolver((of: any) => {
  return Rating;
})
export class RatingResolver {
  constructor(
    private readonly ratingService: RatingService,
    @Inject(forwardRef(() => RequestService)) private readonly requestService: RequestService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
  ) {}

  // TODO: Should not be possible for normal users
  @Query((returns) => [Rating])
  async ratings(): Promise<Rating[]> {
    return this.ratingService.findAll();
  }

  @Query((returns) => [Rating])
  async receivedRatings(@Args('userId') userId: string): Promise<Rating[]> {
    return await this.ratingService.findByReceiver(userId);
  }

  @ResolveProperty()
  async author(@Parent() rating: Rating) {
    return await this.usersService.findById(rating.author);
  }

  @ResolveProperty()
  async receiver(@Parent() rating: Rating) {
    return await this.usersService.findById(rating.receiver);
  }

  @ResolveProperty()
  async request(@Parent() rating: Rating) {
    return await this.requestService.findById(rating.request);
  }
}
