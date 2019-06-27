import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';

import { AccommodationsModule } from './accommodations/accommodations.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/bed-for-breakfast', {
      useNewUrlParser: true,
    }),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    AccommodationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
