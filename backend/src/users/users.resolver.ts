import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { AccommodationsService } from '../accommodations/accommodations.service';
import { LoginResponseTo } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './models/User';
import { UsersService } from './users.service';

import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from 'src/common/types/Upload';

@Resolver((of: any) => User)
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    @Inject(forwardRef(() => AccommodationsService)) private readonly accommodationService: AccommodationsService,
  ) {}

  @ResolveProperty()
  async accommodation(@Parent() user: User) {
    if (user.accommodation) {
      return await this.accommodationService.findById(user.accommodation);
    } else {
      return null;
    }
  }

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation((returns) => LoginResponseTo)
  async signUp(@Args('signUpDto') signUpDto: SignUpDto): Promise<LoginResponseTo> {
    const user = await this.userService.signUp(signUpDto);
    user.verified = false;

    // also log user in
    const { token } = await this.userService.login({ email: user.email, password: signUpDto.password });

    return { user, token };
  }

  @Mutation((returns) => LoginResponseTo)
  async login(@Args('loginDto') loginDto: LoginDto): Promise<LoginResponseTo> {
    return await this.userService.login(loginDto);
  }

  @Mutation(() => Boolean)
  async addProfilePicture(
    @Args({ name: 'picture', type: () => GraphQLUpload })
    picture: Upload,
  ): Promise<boolean> {
    const { createReadStream, filename } = picture;
    return await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/images/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
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
