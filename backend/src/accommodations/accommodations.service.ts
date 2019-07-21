import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { ImageUploadService } from '../image-upload/image-upload.service';
import { UsersService } from '../users/users.service';
import { AccommodationDto } from './dto/create-accommodation.dto';
import { Accommodation } from './models/Accommodation';

@Injectable()
export class AccommodationsService {
  constructor(
    @InjectModel(Accommodation)
    private readonly accommodationModel: ModelType<Accommodation>,
    private readonly userService: UsersService,
    private readonly imageUploadService: ImageUploadService,
  ) {}

  async findAll(): Promise<Accommodation[]> {
    return await this.accommodationModel.find().exec();
  }

  async findByCity(cityName: string): Promise<Accommodation[]> {
    return await this.accommodationModel
      .find({ city: { $regex: new RegExp('^' + cityName.toLowerCase(), 'i') } })
      .exec();
  }

  async findById(id: ObjectId): Promise<Accommodation | null> {
    return this.accommodationModel.findById(id);
  }

  async alter(accommodationDto: AccommodationDto): Promise<Accommodation> {
    const resultAccommodation = await this.accommodationModel
      .findByIdAndUpdate(accommodationDto._id, accommodationDto)
      .exec();
    if (resultAccommodation) {
      return resultAccommodation;
    } else {
      throw NotFoundException;
    }
  }

  async create(accommodationDto: AccommodationDto): Promise<Accommodation> {
    const userOfAccommodation = await this.userService.findById(accommodationDto.user);
    if (userOfAccommodation && !userOfAccommodation.accommodation) {
      let pictureUrls: string[] = [];
      if (accommodationDto.pictures) {
        pictureUrls = await this.imageUploadService.multipleFileUpload(accommodationDto.pictures, {
          folder: 'accommodation_pictures',
          height: 245,
          crop: 'fill',
        });
      }

      const newAccommodation = new this.accommodationModel({ ...accommodationDto, pictures: pictureUrls });
      const createdAccommodation = await newAccommodation.save();

      // also add new accommodation to user
      await this.userService.addAccommodation(createdAccommodation.toObject());

      return createdAccommodation;
    } else {
      throw new HttpException('User already has accommodation.', HttpStatus.FORBIDDEN);
    }
  }
}
