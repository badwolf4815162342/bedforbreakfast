import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { AccommodationDto } from './dto/create-accommodation.dto';
import { Accommodation } from './models/Accommodation';

@Injectable()
export class AccommodationsService {
  constructor(
    @InjectModel(Accommodation)
    private readonly accommodationModel: ModelType<Accommodation>,
  ) {}

  async findAll(): Promise<Accommodation[]> {
    return await this.accommodationModel.find().exec();
  }

  async findById(id: ObjectId): Promise<Accommodation | null> {
    return this.accommodationModel.findById(id);
  }

  async alter(accommodationDto: AccommodationDto): Promise<Accommodation | null> {
    const accommodation = {
      country: accommodationDto.country,
      streetName: accommodationDto.streetName,
      streetNumber: accommodationDto.streetNumber,
      zipCode: accommodationDto.zipCode,
      city: accommodationDto.city,
      description: accommodationDto.description,
      numberOfBeds: accommodationDto.numberOfBeds,
    };
    if (accommodationDto._id === '') {
      const createdAccommodation = new this.accommodationModel(accommodation);
      return await createdAccommodation.save();
    }
    return this.accommodationModel.findByIdAndUpdate(accommodationDto._id, accommodation);
  }

  async create(accommodationDto: {}): Promise<Accommodation> {
    const createdAccommodation = new this.accommodationModel(accommodationDto);
    return await createdAccommodation.save();
  }
}
