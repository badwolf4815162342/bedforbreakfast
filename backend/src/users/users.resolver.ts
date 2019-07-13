import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { LoginResponseTo } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterResponseTo } from './dto/register-response.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './models/User';
import { UsersService } from './users.service';

@Resolver((of: any) => {
  return User;
})
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation((returns) => RegisterResponseTo)
  async registerUser(@Args('registerDto') registerDto: RegisterUserDto): Promise<RegisterResponseTo> {
    const user = await this.userService.register(registerDto);
    user.isHost = true;
    user.isGuest = true;
    user.verified = true;

    const { token } = await this.userService.login({ email: user.email, password: user.password });

    return { user, token };
  }

  @Mutation((returns) => LoginResponseTo)
  async login(@Args('loginDto') loginDto: LoginDto): Promise<LoginResponseTo> {
    return await this.userService.login(loginDto);
  }
}
