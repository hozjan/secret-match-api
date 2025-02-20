import {
  Request,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('join')
  async join(@Request() req): Promise<{message: string}> {
    this.matchService.joinMatch(req['user_data']);
    return { message: 'Successfully joined the Secret Match event!' };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('assign')
  async assign(@Request() req): Promise<{message: string}> {
    await this.matchService.assignMatch(req['user_data']);
    return { message: 'Matching complete!' };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('view')
  async view(@Request() req): Promise<{ name: string; email: string }> {
    const match_data = await this.matchService.viewMatch(req['user_data']);
    return match_data;
  }
}
