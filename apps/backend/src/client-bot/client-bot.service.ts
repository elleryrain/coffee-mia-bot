import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { BotsConfigService } from '../config/bots.config';
import { TOrder } from '../types/order';
import { Markup } from 'telegraf';
@Injectable()
export class ClientBotService implements OnApplicationBootstrap {
  private bot: Telegraf;
  constructor(private readonly botsConfigService: BotsConfigService) {
    //
    console.log(console.log('new bot'));
  }
  onApplicationBootstrap() {
    this.initializeBot();
  }

  initializeBot() {
    const token = this.botsConfigService.getUserBotToken();
    this.bot = new Telegraf(token);
    const keyboard = Markup.inlineKeyboard([
      {
        text: 'купить кофе',
        web_app: {
          url: 'https://2r7h20t6-4200.euw.devtunnels.ms/',
        },
      },
    ]);

    this.bot.start(async (ctx) => {
      await ctx.reply('Привет. Я пользовательский бот', keyboard);
    });

    this.bot.launch();
  }
  async sendOrder(userId: number, order: TOrder) {
    const keyboard = Markup.inlineKeyboard([
      [
        {
          text: 'Поддержка',
          url: 'https://t.me/elleryrain',
        },
        {
          text: 'отменить заказ',
          callback_data: 'action_cancel_order',
        },
      ],
      [
        {
          text: 'Я оплатил',
          callback_data: 'action_user_accept_order',
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
    await this.bot.telegram.sendMessage(userId, message, keyboard);
  }
}
