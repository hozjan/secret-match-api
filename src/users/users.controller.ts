import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto
  ): Promise<{ access_token: string }> {
    const jwsToken = await this.usersService.login(loginUserDto);
    return jwsToken;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<{ message: string }> {
    const user = await this.usersService.register(createUserDto);
    return { message: 'User created successfully!' };
  }
}
