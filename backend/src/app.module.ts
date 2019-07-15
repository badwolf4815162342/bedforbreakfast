import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';

import { AccommodationsModule } from './accommodations/accommodations.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { MealModule } from './meal/meal.module';
import { RatingModule } from './rating/rating.module';
import { RequestModule } from './request/request.module';
import { UserModule } from './user/user.module';
=======
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
>>>>>>> 2ee24a99b8c2db8331cb282876c2aa6ae839ff45

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/bed-for-breakfast', {
      useNewUrlParser: true,
    }),
    AuthenticationModule,
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql', context: ({ req }) => ({ req }) }),
    AccommodationsModule,
<<<<<<< HEAD
    UserModule,
    RatingModule,
    RequestModule,
    MealModule,
=======
    UsersModule,
>>>>>>> 2ee24a99b8c2db8331cb282876c2aa6ae839ff45
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
