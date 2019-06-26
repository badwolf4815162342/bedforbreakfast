import { Accommodation } from '@bed-for-breakfast/shared/dist/interfaces/Accommodation';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AccommodationModel } from '../Accommodation';

@Injectable()
export class AccommodationsService {
  constructor(
    @InjectModel('Accommodation')
    private readonly accommodationModel: Model<AccommodationModel>,
  ) {}

  async getAccommodations(): Promise<Accommodation[]> {
    return new Promise((resolve, reject) => {
      resolve([{ name: 'test', city: 'test' }]);
    });
  }
}
