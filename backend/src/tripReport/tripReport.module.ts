import { forwardRef, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ImageUploadService } from '../image-upload/image-upload.service';
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
    ImageUploadService,
  ],
  providers: [TripReportService, TripReportResolver],
  exports: [TripReportService],
})
export class TripReportModule {}
