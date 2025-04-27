import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Markup, Telegraf } from 'telegraf';
import { BotsConfigService } from '../config/bots.config';
import { TOrder } from '../types/order';
@Injectable()
export class AdminBotService implements OnApplicationBootstrap {
  private bot: Telegraf;
  private currentAdmin: number;
  constructor(private readonly botsConfigService: BotsConfigService) {
    this.currentAdmin = 6744996008;
  }

  onApplicationBootstrap() {
    this.initializeBot();
  }
  initializeBot() {
    const token = this.botsConfigService.getAdminBotToken();
    console.log(token);
    this.bot = new Telegraf(token);
    this.bot.start(async (ctx) => {
      await ctx.reply('Привет. Я админ бот');
      // this.currentAdmin = ctx.chat.id;
      // console.log(this.currentAdmin);
    });

    this.bot.launch();
  }
  async sendOrder(order: TOrder) {
    const keyboard = Markup.inlineKeyboard([
      [
        {
          text: 'подтвердить оплату',
          callback_data: 'accept_pay',
        },
      ],

      [
        {
          text: 'написать клиенту',
          url: `https://t.me/elleryrain`,
        },
      ],
    ]);
    const itemPart = order.items.map(
      (item, idx) => `
        ${idx}
  
      ${item.title}
  
      ${item.count} шт
      
      `
    );
    const message = `
        Ваш заказ
  
        Номер заказа: ${order.id}
  
      ${itemPart}
  
      Доставка 500 рублей
      ${order.deliveryType}
      адрес: ${order.address}
  
      ${order.sum}
  
      ${order.status}
      `;
    await this.bot.telegram.sendMessage(this.currentAdmin, message, keyboard);
  }
}
