import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './authorization/jwt/jwt.guard';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export interface AuthenticatedRequest extends Request {
  user: any;
}

@Controller()
export class AppController {
  // constructor(
  //   private readonly appService: AppService,
  //   @InjectConnection() private readonly connection: Connection
  // ) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('protected')
  // getProtected(@Req() req: AuthenticatedRequest) {
  //   return {
  //     user: req.user,
  //     headers: req.headers,
  //   };
  // }
}
