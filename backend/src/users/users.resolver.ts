import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginResponseTo } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './models/User';
import { UsersService } from './users.service';

@Resolver((of: any) => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation((returns) => LoginResponseTo)
  async signUp(@Args('signUpDto') signUpDto: SignUpDto): Promise<LoginResponseTo> {
    const user = await this.userService.signUp(signUpDto);
    user.isHost = false;
    user.isGuest = true; // TODO: JH when to set user beeing guest? Is everone a guest?
    user.verified = false;

    // also log user in
    const { token } = await this.userService.login({ email: user.email, password: signUpDto.password });

    return { user, token };
  }

  @Mutation((returns) => LoginResponseTo)
  async login(@Args('loginDto') loginDto: LoginDto): Promise<LoginResponseTo> {
    return await this.userService.login(loginDto);
  }

  @Query((returns) => User, { nullable: true })
  async user(@Args('userId') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }
}
