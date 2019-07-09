import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { User } from './models/User';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ModelType<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async create(createUserDto: {
    email: string;
    password: string;
    phoneNumber: number;
    isHost: boolean;
    isGuest: boolean;
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;
    description: string;
    profilePicture: string;
    verified: boolean;
    homeTown: string;
    homeCountry: string;
    favoriteFood: string;
  }): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }
}
