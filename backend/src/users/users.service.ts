import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';
import { AccommodationDto } from 'src/accommodations/dto/create-accommodation.dto';
import { ModelType } from 'typegoose';

import { AuthenticationService } from '../authentication/authentication.service';
import { JwtPayload } from '../authentication/interfaces/jwt-payload.interface';
import { ImageUploadService } from '../image-upload/image-upload.service';
import { Meal } from '../meal/models/Meal';
import { AlterUserDto } from './dto/alter-user.dto';
import { LoginResponseTo } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './models/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ModelType<User>,
    @Inject(forwardRef(() => AuthenticationService)) private readonly authService: AuthenticationService,
    private readonly imageUploadService: ImageUploadService,
  ) {}

  async findById(id: ObjectId | string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.userModel.find({ email }).exec();
    if (result) {
      return result[0];
    } else {
      return null;
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    let { password } = signUpDto;

    const salt = await genSalt();
    password = await hash(password, salt);

    const imageUrl = await this.imageUploadService.singleFileUpload(signUpDto.profilePicture, {
      folder: 'profile_pictures',
      width: 200,
      height: 200,
      crop: 'fill',
      gravity: 'faces',
    });

    // add hashed password to user object
    const createdUser = new this.userModel({
      ...signUpDto,
      password,
      profilePicture: imageUrl,
      verified: false,
    });

    return createdUser.save();
  }

  async login(loginDto: LoginDto): Promise<LoginResponseTo> {
    const { email, password } = loginDto;

    const user = await this.findByEmail(email);

    // user not found
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.NOT_FOUND);
    }

    const isMatch = await compare(password, user.password);

    // wrong password
    if (!isMatch) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }

    const payload: JwtPayload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);

    return { token, user };
  }

  async alter(alterUserDto: AlterUserDto): Promise<User | null> {
    const user = {
      firstName: alterUserDto.firstName,
      lastName: alterUserDto.lastName,
      email: alterUserDto.email,
      phoneNumber: alterUserDto.phoneNumber,
      birthday: alterUserDto.birthday,
      gender: alterUserDto.gender,
      profilePicture: alterUserDto.profilePicture,
      homeTown: alterUserDto.homeTown,
      homeCountry: alterUserDto.homeCountry,
      favoriteFood: alterUserDto.favoriteFood,
    };
    if (alterUserDto._id === '') {
      const createdAccommodation = new this.userModel(user);
      return await createdAccommodation.save();
    }
    return this.userModel.findByIdAndUpdate(alterUserDto._id, user);
  }

  async addAccommodation(accommodation: AccommodationDto) {
    // check if user already has accommodation
    const userDocument = await this.userModel.findById(accommodation.user).exec();
    if (userDocument) {
      const user = userDocument.toObject();
      if (user.accommodation) {
        throw new HttpException('User already has accommodation.', HttpStatus.BAD_REQUEST);
      } else {
        const newUser = { ...user, accommodation: accommodation._id };
        await this.userModel.findByIdAndUpdate(user._id, newUser).exec();
      }
    }
  }
  async addMeal(user: User, meal: Meal): Promise<User | null> {
    const newUser = {
      meals: user.meals,
    };
    (user.meals as ObjectId[]).push(meal._id);
    return this.userModel.findByIdAndUpdate(user._id, newUser);
  }

  async alterLikes(user: User, rating: boolean, author: User): Promise<User | null> {
    const newUser = {
      likedBy: user.likedBy,
      dislikedBy: user.dislikedBy,
    };
    if (rating) {
      (newUser.likedBy as ObjectId[]).push(author._id);
    } else {
      (newUser.dislikedBy as ObjectId[]).push(author._id);
    }
    return this.userModel.findByIdAndUpdate(user._id, newUser);
  }
}
