import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { LoginResponseTo } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpResponseTo } from './dto/sign-up-response.dto';
import { SignUpDto } from './dto/sign-up.dto';
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

  @Mutation((returns) => SignUpResponseTo)
  async signUp(@Args('signUpDto') signUpDto: SignUpDto): Promise<SignUpResponseTo> {
    const user = await this.userService.signUp(signUpDto);
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
