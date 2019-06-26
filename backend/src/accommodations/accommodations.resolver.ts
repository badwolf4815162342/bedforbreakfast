import { Accommodation } from '@bed-for-breakfast/shared/dist/interfaces/Accommodation';
import { Query, Resolver } from '@nestjs/graphql';
import { AccommodationsService } from './accommodations.service';

@Resolver((of: any) => {
  return Accommodation;
})
export class AccommodationResolver {
  constructor(private readonly accommodationService: AccommodationsService) {}

  @Query((returns) => [Accommodation])
  async accommodations(): Promise<Accommodation[]> {
    return this.accommodationService.getAccommodations();
  }
}
