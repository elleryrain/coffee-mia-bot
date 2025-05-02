import { Bot } from 'grammy';
import { config } from 'dotenv';
import { BOT_CONFIG } from '../config/env.config';
config();
export async function setupBot() {
  const bot = new Bot(BOT_CONFIG.botToken);
  bot.command('start', (ctx) => {
    console.log(ctx.chatId);
    ctx.reply('Привет, я клиентский бот');
  });

  return bot;
}
