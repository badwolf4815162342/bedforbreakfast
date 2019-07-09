import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';

import { AccommodationsModule } from './accommodations/accommodations.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/bed-for-breakfast', {
      useNewUrlParser: true,
    }),
    AuthenticationModule,
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql', context: ({ req }) => ({ req }) }),
    AccommodationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
