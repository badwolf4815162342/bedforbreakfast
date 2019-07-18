import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from 'src/common/types/Upload';

import { AccommodationsService } from '../accommodations/accommodations.service';
import { ImageUploadService } from '../image-upload/image-upload.service';
import { LoginResponseTo } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './models/User';
import { UsersService } from './users.service';

@Resolver((of: any) => User)
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    @Inject(forwardRef(() => AccommodationsService)) private readonly accommodationService: AccommodationsService,
    private readonly imageUploadService: ImageUploadService,
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

    // also log user in
    const { token } = await this.userService.login({ email: user.email, password: signUpDto.password });

    return { user, token };
  }

  @Mutation((returns) => LoginResponseTo)
  async login(@Args('loginDto') loginDto: LoginDto): Promise<LoginResponseTo> {
    return await this.userService.login(loginDto);
  }

  @Mutation(() => String)
  async addProfilePicture(
    @Args({ name: 'picture', type: () => GraphQLUpload })
    picture: Upload,
  ): Promise<string> {
    return this.imageUploadService.singleFileUpload(picture);
  }

  @Query((returns) => User, { nullable: true })
  async user(@Args('userId') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @ResolveProperty()
  async likedBy(@Parent() user: User) {
    const likedBy: User[] = [];
    if (user.likedBy) {
      await Promise.all(
        user.likedBy.map(async (likeUserId) => {
          const like = await this.userService.findById(likeUserId);
          if (like) {
            likedBy.push(like);
          }
        }),
      );
    }
    return likedBy;
  }

  @ResolveProperty()
  async dislikedBy(@Parent() user: User) {
    const dislikedBy: User[] = [];
    if (user.dislikedBy) {
      await Promise.all(
        user.dislikedBy.map(async (dislikeUserId) => {
          const dislike = await this.userService.findById(dislikeUserId);
          if (dislike) {
            dislikedBy.push(dislike);
          }
        }),
      );
    }
    return dislikedBy;
  }
}
