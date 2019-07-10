import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { AuthenticationService } from '../authentication/authentication.service'; // tslint:disable-line
import { JwtPayload } from '../authentication/interfaces/jwt-payload.interface';
import { LoginResponseTo } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './models/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ModelType<User>,
    @Inject(forwardRef(() => AuthenticationService)) private readonly authService: AuthenticationService,
  ) {}

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

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    let { password } = registerUserDto;

    const salt = await genSalt();
    password = await hash(password, salt);

    // add hashed password to user object
    const createdUser = new this.userModel({ ...registerUserDto, password });

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
}
