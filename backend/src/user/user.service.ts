import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { CreateUserDto } from './dto/create-user.dto';
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }
}
