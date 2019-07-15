import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/User';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CreateRatingDto } from '../rating/dto/create-rating.dto';
import { Rating } from '../rating/models/Rating';
import { UserModel } from './models/User';
import { RatingService } from '../rating/rating.service';

@Resolver((of: any) => {
  return User;
})
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query((returns) => User, { nullable: true })
  async user(@Args('userId') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Mutation((returns) => User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
}
