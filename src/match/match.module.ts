import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [UsersModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService]
})
export class MatchModule {}
