import { Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { Rating } from './models/Rating';
import { RatingService } from './rating.service';
import { RequestService } from '../request/request.service';
import { Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Resolver((of: any) => {
  return Rating;
})
export class RatingResolver {
  constructor(
    private readonly ratingService: RatingService,
    @Inject(forwardRef(() => RequestService)) private readonly requestService: RequestService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
  ) {}

  @Query((returns) => [Rating])
  async ratings(): Promise<Rating[]> {
    return this.ratingService.findAll();
  }

  @ResolveProperty()
  async request(@Parent() rating: Rating) {
    return await this.requestService.findById(rating.request);
  }

  @ResolveProperty()
  async author(@Parent() rating: Rating) {
    return await this.usersService.findById(rating.author);
  }
}
