import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    // private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn() {
    const user: JwtPayload = { email: 'user@email.com' };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // return await this.usersService.findOneByEmail(payload.email);
    return { name: 'test', email: 'testi' };
  }
}
