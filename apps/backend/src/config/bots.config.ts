import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BotsConfigService {
  constructor(private readonly configService: ConfigService) {}
  getUserBotToken() {
    const token = this.configService.get<string>('BOT_TOKEN') as string;
    return token;
  }
  getAdminBotToken() {
    const token = this.configService.get<string>('ADMIN_BOT_TOKEN') as string;
    return token;
  }
}
