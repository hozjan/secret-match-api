import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MatchModule } from './match/match.module';
import { ResendModule } from 'nest-resend';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONNECTION_STRING!),
    ResendModule.forRoot({
      apiKey: process.env.RESEND_API_KEY!
    }),
    MatchModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
