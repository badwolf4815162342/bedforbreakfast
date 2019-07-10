import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccommodationsService } from './accommodations.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { Accommodation } from './models/Accommodation';

@Resolver((of: any) => {
  return Accommodation;
})
export class AccommodationResolver {
  constructor(private readonly accommodationService: AccommodationsService) {}

  @Query((returns) => [Accommodation])
  async accommodations(): Promise<Accommodation[]> {
    return this.accommodationService.findAll();
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
  async createAccommodation(
    @Args('createAccommodationDto')
    createAccommodationDto: CreateAccommodationDto,
  ): Promise<Accommodation> {
    return await this.accommodationService.create(createAccommodationDto);
  }
}
