import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUserProfile(user: any): string {
    return `User profile: ${user.username} with userId ${user.userId}`;
  }
}