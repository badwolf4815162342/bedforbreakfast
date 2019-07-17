import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';
import { AccommodationDto } from 'src/accommodations/dto/create-accommodation.dto';
import { ModelType } from 'typegoose';

import { createWriteStream } from 'fs';
import { AuthenticationService } from '../authentication/authentication.service';
import { JwtPayload } from '../authentication/interfaces/jwt-payload.interface';
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

    const { createReadStream, filename } = signUpDto.profilePicture;

    const path = `/images/${filename}`;

    const saveSuccess = await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + path))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );

    // add hashed password to user object
    const createdUser = new this.userModel({ ...signUpDto, password, profilePicture: __dirname + path });

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
}
