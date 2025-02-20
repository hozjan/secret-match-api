import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  PreconditionFailedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private usersService: UsersService
  ) {}

  async joinMatch(user_data): Promise<void> {
    const user = await this.userModel.findOne({ _id: user_data._id });
    if (user === null)
      throw new NotFoundException({ error: 'User not found!' });
    await this.userModel.updateOne({ _id: user._id }, { inEvent: true });
  }

  async assignMatch(user_data): Promise<void> {
    const user = await this.userModel.findOne({ _id: user_data._id });
    if (user === null)
      throw new NotFoundException({ error: 'User not found!' });
    if (!user?.isAdmin) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const participants = await this.userModel.find({ inEvent: true });

    if (participants?.length == 0) {
      throw new PreconditionFailedException({
        error: 'No participants in the Secret Match event!'
      });
    }

    // shuffle the list
    participants.sort(() => Math.random() - 0.5);
    // assign matches
    for (let idx = 0; idx < participants.length; idx++) {
      const match_idx = (idx + 1) % participants.length;
      await this.userModel.updateOne(
        { _id: participants[idx]._id },
        { match: participants[match_idx]._id }
      );
    }
  }

  async viewMatch(user_data): Promise<{ name: string; email: string, message: string }> {
    const user = await this.userModel
      .findOne({ _id: user_data._id })
      .populate('match');
    if (user === null)
      throw new NotFoundException({ error: 'User not found!' });
    if (!user.inEvent)
      throw new NotFoundException({
        error: 'You have not joined the Secret Match event yet!'
      });
    if (user.match === null)
      throw new NotFoundException({
        error: 'You have not been assigned a match yet!'
      });
    return { name: user.match.name, email: user.match.email, message: user.match.message };
  }
}
