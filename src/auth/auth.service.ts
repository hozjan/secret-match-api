import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email, name: user.name };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWS_TOKEN_SECRET
    });
    return {
      access_token: access_token
    };
  }
}
