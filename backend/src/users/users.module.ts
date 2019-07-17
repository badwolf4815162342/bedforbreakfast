import { forwardRef, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AccommodationsModule } from '../accommodations/accommodations.module';
import { User } from './models/User';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypegooseModule.forFeature([User]), forwardRef(() => AccommodationsModule)],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
