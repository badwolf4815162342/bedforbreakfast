import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { UsersService } from '../users/users.service';
import { AccommodationDto } from './dto/create-accommodation.dto';
import { Accommodation } from './models/Accommodation';

@Injectable()
export class AccommodationsService {
  constructor(
    @InjectModel(Accommodation)
    private readonly accommodationModel: ModelType<Accommodation>,
    private readonly userService: UsersService,
  ) {}

  async findAll(): Promise<Accommodation[]> {
    return await this.accommodationModel.find().exec();
  }

  async findByCity(cityName: string): Promise<Accommodation[]> {
    return await this.accommodationModel.find({ city: cityName }).exec();
  }

  async findById(id: ObjectId): Promise<Accommodation | null> {
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

  async create(accommodationDto: AccommodationDto): Promise<Accommodation> {
    const newAccommodation = new this.accommodationModel(accommodationDto);
    const createdAccommodation = await newAccommodation.save();

    // also add new accommodation to user
    await this.userService.addAccommodation(createdAccommodation.toObject());

    return createdAccommodation;
  }
}
