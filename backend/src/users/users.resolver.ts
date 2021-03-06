import { forwardRef, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from '../common/types/Upload';

import { AccommodationsService } from '../accommodations/accommodations.service';
import { GqlAuthGuard, User as CurrentUser } from '../authentication/guards/jwt.auth.guard';
import { ImageUploadService } from '../image-upload/image-upload.service';
import { CreateMealDto } from '../meal/dto/create-meal.dto';
import { MealService } from '../meal/meal.service';
import { Meal } from '../meal/models/Meal';
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
    @Inject(forwardRef(() => MealService)) private readonly mealService: MealService,
    private readonly imageUploadService: ImageUploadService,
  ) {}

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

  @Query((returns) => User)
  async user(@Args('userId') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User id not found',
        },
        404,
      );
    }
    return user;
  }

  // tslint:disable-next-line: max-line-length
  // Conditions: logged in as request.proposer or request.receiver Trip accepted, request date is before today, only 2 ratings possible receiverOfRequest,AuthorOfRequest
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Meal)
  async createMeal(@Args('createMealDto') createMealDto: CreateMealDto, @CurrentUser() user: User): Promise<Meal> {
    const newMeal = await this.mealService.create({ ...createMealDto, user });

    // update the user
    const updatedUser = await this.userService.addMeal(user, newMeal);
    if (!updatedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User id not found',
        },
        404,
      );
    }
    return newMeal;
  }

  // tslint:disable-next-line: max-line-length
  // Conditions: logged in as request.proposer or request.receiver Trip accepted, request date is before today, only 2 ratings possible receiverOfRequest,AuthorOfRequest
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async createTestMeals(@CurrentUser() user: User): Promise<User> {
    // TestMeal 1:
    const createMealDto1: CreateMealDto = {
      description: 'This is a fancy fruit bread thing and additional salad and egg.',
      profilePicture:
        'https://res.cloudinary.com/bed-for-breakfast/image/upload/v1563550228/meal_pictures/photo5357541118859914298_w8t1lk.jpg',
    };

    const newMeal1 = await this.mealService.create({ ...createMealDto1, user });

    // update the user
    let updatedUser = await this.userService.addMeal(user, newMeal1);
    if (!updatedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User id not found',
        },
        404,
      );
    }
    // TestMeal 2:
    const createMealDto2: CreateMealDto = {
      description: 'Nice Noodles :)',
      profilePicture:
        'https://res.cloudinary.com/bed-for-breakfast/image/upload/v1563550557/meal_pictures/photo5226494923560299118_keoeoe.jpg',
    };

    const newMeal2 = await this.mealService.create({ ...createMealDto2, user });

    // update the user
    updatedUser = await this.userService.addMeal(updatedUser, newMeal2);
    if (!updatedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User id not found',
        },
        404,
      );
    }
    // TestMeal 3:
    const createMealDto3: CreateMealDto = {
      description: 'Great Burger with everything nice on it!',
      profilePicture:
        'https://res.cloudinary.com/bed-for-breakfast/image/upload/v1563550557/meal_pictures/photo5231465661010651654_a3qhwb.jpg',
    };

    const newMeal3 = await this.mealService.create({ ...createMealDto3, user });

    // update the user
    updatedUser = await this.userService.addMeal(updatedUser, newMeal3);
    if (!updatedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User id not found',
        },
        404,
      );
    }
    updatedUser = await this.userService.findById(updatedUser._id);
    if (!updatedUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Receiver not found.',
        },
        404,
      );
    }
    return updatedUser;
  }

  @ResolveProperty()
  async accommodation(@Parent() user: User) {
    if (user.accommodation) {
      return await this.accommodationService.findById(user.accommodation);
    } else {
      return null;
    }
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

  @ResolveProperty()
  async meals(@Parent() user: User) {
    const meals: Meal[] = [];
    if (user.meals) {
      await Promise.all(
        user.meals.map(async (mealId) => {
          const meal = await this.mealService.findById(mealId);
          if (meal) {
            meals.push(meal);
          }
        }),
      );
    }
    return meals;
  }
}
