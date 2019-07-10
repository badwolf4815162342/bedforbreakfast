import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service'; // tslint:disable-line
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signPayload(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findByEmail(payload.email);
  }
}
