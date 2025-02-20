import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Document } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: Document): Promise<{ access_token: string }> {
    const payload = { _id: user._id };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET
    });
    return {
      access_token: access_token
    };
  }
}
