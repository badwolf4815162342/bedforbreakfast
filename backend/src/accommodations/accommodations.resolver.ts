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

  @Mutation((returns) => Accommodation)
  async createAccommodation(
    @Args('createAccommodationDto')
    createAccommodationDto: CreateAccommodationDto,
  ): Promise<Accommodation> {
    return await this.accommodationService.create(createAccommodationDto);
  }
}
