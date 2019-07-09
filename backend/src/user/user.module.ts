import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { User } from './models/User';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
