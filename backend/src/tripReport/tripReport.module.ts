import { forwardRef, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { RequestModule } from '../request/request.module';
import { UsersModule } from '../users/users.module';
import { TripReport } from './models/TripReport';
import { TripReportResolver } from './tripReport.resolver';
import { TripReportService } from './tripReport.service';

@Module({
  imports: [
    TypegooseModule.forFeature([TripReport]),
    forwardRef(() => RequestModule),
    forwardRef(() => UsersModule),
    ImageUploadModule,
  ],
  providers: [TripReportService, TripReportResolver],
  exports: [TripReportService],
})
export class TripReportModule {}
