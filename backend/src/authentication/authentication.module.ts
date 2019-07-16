import { forwardRef, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';

import { AuthenticationService } from './authentication.service';
import { GqlAuthGuard } from './guards/jwt.auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthenticationService, JwtStrategy, GqlAuthGuard],
  exports: [PassportModule, AuthenticationService, GqlAuthGuard],
})
export class AuthenticationModule {}
