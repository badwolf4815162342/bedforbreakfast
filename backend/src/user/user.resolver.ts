import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/User';
import { UserService } from './user.service';

@Resolver((of: any) => {
  return User;
})
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation((returns) => User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
}
