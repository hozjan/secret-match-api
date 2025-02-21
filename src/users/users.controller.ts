import {
  Request,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { MessageDto } from './dto/message.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto
  ): Promise<{ access_token: string }> {
    const JWT = await this.usersService.login(loginUserDto);
    return JWT;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<{ message: string }> {
    await this.usersService.register(createUserDto);
    return { message: 'User created successfully!' };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('message')
  async addMessage(
    @Request() req,
    @Body() message: MessageDto
  ): Promise<{ message: string }> {
    await this.usersService.addMessage(req['user_data'], message);
    return { message: 'Message added successfully!' };
  }
}
