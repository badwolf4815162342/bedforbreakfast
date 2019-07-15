import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';

import { AccommodationsModule } from './accommodations/accommodations.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripReportModule } from './tripReport/tripReport.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/bed-for-breakfast', {
      useNewUrlParser: true,
    }),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    AccommodationsModule,
    UserModule,
    TripReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
