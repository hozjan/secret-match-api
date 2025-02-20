import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (user === null) {
      throw new UnauthorizedException({
        error: 'No account was found with this email!'
      });
    }
    const isMatching = await compare(loginUserDto.password, user.password);
    if (!isMatching)
      throw new UnauthorizedException({ error: 'Wrong password!' });
    const jwsToken = await this.authService.login(user);
    return jwsToken;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user !== null) {
      throw new ConflictException({
        error: 'This email is already in use!'
      });
    }
    const createdUser = new this.userModel(createUserDto);
    const newUser = await createdUser.save();
    return newUser;
  }

  async addMessage(user_data, message: MessageDto): Promise<void> {
    const user = await this.userModel.findOne({ _id: user_data._id });
    if (user === null) {
      throw new NotFoundException({ error: 'User not found!' });
    }
    await this.userModel.updateOne({ _id: user._id }, { message: message.message });
  }
}
