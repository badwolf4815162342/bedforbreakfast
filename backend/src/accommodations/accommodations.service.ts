import { Injectable } from '@nestjs/common';
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

  async findByCity(cityName: string): Promise<Accommodation[]> {
    return await this.accommodationModel.find({ city: cityName }).exec();
  }

  async findById(id: string): Promise<Accommodation | null> {
    return this.accommodationModel.findById(id);
  }

  async alter(accommodationDto: AccommodationDto): Promise<Accommodation | null> {
    const accommodation = {
      isActive: accommodationDto.isActive,
      country: accommodationDto.country,
      streetName: accommodationDto.streetName,
      streetNumber: accommodationDto.streetNumber,
      zipCode: accommodationDto.zipCode,
      city: accommodationDto.city,
      description: accommodationDto.description,
      district: accommodationDto.description,
      numberOfBeds: accommodationDto.numberOfBeds,
      pictures: accommodationDto.pictures,
    };
    if (accommodationDto._id === '') {
      const createdAccommodation = new this.accommodationModel(accommodation);
      return await createdAccommodation.save();
    }
    return this.accommodationModel.findByIdAndUpdate(accommodationDto._id, accommodation);
  }

  async create(createAccommodationDto: {}): Promise<Accommodation> {
    const createdAccommodation = new this.accommodationModel(createAccommodationDto);
    return await createdAccommodation.save();
  }
}
