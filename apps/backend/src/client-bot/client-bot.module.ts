import { Module } from '@nestjs/common';
import { ClientBotService } from './client-bot.service';
import { BotsConfigService } from '../config/bots.config';

@Module({
  imports: [],
  providers: [ClientBotService, BotsConfigService],
  exports: [ClientBotService],
})
export class ClientBotModule {}
