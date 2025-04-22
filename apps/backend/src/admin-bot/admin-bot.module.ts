import { Module } from '@nestjs/common';
import { AdminBotService } from './admin-bot.service';
import { BotsConfigService } from '../config/bots.config';

@Module({
  providers: [AdminBotService, BotsConfigService],
  exports: [AdminBotService],
})
export class AdminBotModule {}
