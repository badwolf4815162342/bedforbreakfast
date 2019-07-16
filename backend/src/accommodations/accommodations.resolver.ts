import { NotFoundException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../authentication/guards/jwt.auth.guard';

import { AccommodationsService } from './accommodations.service';
import { AccommodationDto } from './dto/create-accommodation.dto';
import { Accommodation } from './models/Accommodation';

@Resolver((of: any) => {
  return Accommodation;
})
export class AccommodationResolver {
  constructor(private readonly accommodationService: AccommodationsService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Accommodation])
  async accommodations(): Promise<Accommodation[]> {
    return this.accommodationService.findAll();
  }

  @Query((returns) => [Accommodation])
  async accommodationsByCity(@Args('city') city: string): Promise<Accommodation[]> {
    return this.accommodationService.findByCity(city);
  }

  @Query((returns) => Accommodation)
  async accommodationById(@Args('_id') id: string): Promise<Accommodation> {
    const accommodation = await this.accommodationService.findById(id);
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
    const accommodation = await this.accommodationService.alter(accommodationDto);
    if (!accommodation) {
      throw new NotFoundException(accommodationDto._id);
    }
    return accommodation;
  }

  @Mutation((returns) => Accommodation)
  async createAccommodation(
    @Args('createAccommodationDto')
    createAccommodationDto: AccommodationDto,
  ): Promise<Accommodation> {
    return await this.accommodationService.create(createAccommodationDto);
  }
}
