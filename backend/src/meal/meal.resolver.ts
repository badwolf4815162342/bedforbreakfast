import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from '../common/types/Upload';
import { ImageUploadService } from '../image-upload/image-upload.service';
import { MealService } from './meal.service';
import { Meal } from './models/Meal';

@Resolver((of: any) => {
  return Meal;
})
export class MealResolver {
  constructor(private readonly mealService: MealService, private readonly imageUploadService: ImageUploadService) {}

  @Query((returns) => [Meal])
  async meals(): Promise<Meal[]> {
    return this.mealService.findAll();
  }

  @Mutation(() => String)
  async addMealPicture(
    @Args({ name: 'picture', type: () => GraphQLUpload })
    picture: Upload,
  ): Promise<string> {
    return this.imageUploadService.singleFileUpload(picture);
  }
}
