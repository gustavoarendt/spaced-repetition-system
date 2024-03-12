import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UserPayload {
  sub: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    const authenticatedUser = await bcrypt.compare(password, user.password);

    if (!authenticatedUser) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload: UserPayload = {
      sub: user.id,
      username: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
