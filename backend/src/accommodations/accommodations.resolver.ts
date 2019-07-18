import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Arg } from 'type-graphql';

import { GqlAuthGuard, User as CurrentUser } from '../authentication/guards/jwt.auth.guard';
import { ObjectIdScalar } from '../common/scalars/object-id.scalar';
import { User } from '../users/models/User';
import { UsersService } from '../users/users.service';
import { AccommodationsService } from './accommodations.service';
import { AccommodationDto } from './dto/create-accommodation.dto';
import { Accommodation } from './models/Accommodation';

@Resolver((of: any) => Accommodation)
export class AccommodationResolver {
  constructor(
    private readonly accommodationsService: AccommodationsService,
    private readonly usersService: UsersService,
  ) {}

  @ResolveProperty()
  async user(@Parent() accommodation: Accommodation) {
    return await this.usersService.findById(accommodation.user);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Accommodation])
  async accommodations(): Promise<Accommodation[]> {
    return await this.accommodationsService.findAll();
  }

  @Query((returns) => [Accommodation])
  async accommodationsByCity(@Args('city') city: string): Promise<Accommodation[]> {
    return this.accommodationsService.findByCity(city);
  }

  @Query((returns) => Accommodation)
  async accommodationById(@Arg('_id', (type) => ObjectIdScalar) id: ObjectId): Promise<Accommodation> {
    const accommodation = await this.accommodationsService.findById(id);
    if (!accommodation) {
      throw new NotFoundException(id);
    }
    return accommodation;
  }

  @Mutation((returns) => Accommodation)
  async alterAccommodation(
    @Args('accommodationDto')
    accommodationDto: AccommodationDto,
  ): Promise<Accommodation> {
    const accommodation = await this.accommodationsService.alter(accommodationDto);
    if (!accommodation) {
      throw new NotFoundException(accommodationDto._id);
    }
    return accommodation;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Accommodation)
  async createAccommodation(
    @Args('createAccommodationDto')
    accommodationDto: AccommodationDto,
    @CurrentUser() user: User,
  ): Promise<Accommodation> {
    return await this.accommodationsService.create({ ...accommodationDto, user: user._id });
  }
}
