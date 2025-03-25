import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { BotsConfigService } from '../config/bots.config';
@Injectable()
export class AdminBotService implements OnApplicationBootstrap {
  private bot: Telegraf;
  constructor(private readonly botsConfigService: BotsConfigService) {}

  onApplicationBootstrap() {
    this.initializeBot();
  }
  initializeBot() {
    const token = this.botsConfigService.getAdminBotToken();
    console.log(token);
    this.bot = new Telegraf(token);
    this.bot.start((ctx) => ctx.reply('Привет. Я админ бот'));
    this.bot.launch();
  }
}
