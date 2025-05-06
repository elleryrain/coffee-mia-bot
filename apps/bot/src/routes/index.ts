import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ApiOrderBot } from '@shared';

export async function setupRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/order',
    async (
      req: FastifyRequest<{ Body: ApiOrderBot.TPostOrderBodyDto }>,
      reply: FastifyReply
    ) => {
      const body = req.body;
      let message = 'Ваш заказ:\n\n';
      message += `Номер заказ: ${body.id}\n\n`;

      message += body.items
        .map((item, idx) => {
          let partItemMsg = `${idx}.\n`;
          partItemMsg += `${item.name}\n`;
          partItemMsg += `${item.grindingTypeName}\n`;
          partItemMsg += `${item.weight}г\n`;
          partItemMsg += `${item.cost} шт\n`;
          partItemMsg += '\n';
          return partItemMsg;
        })
        .join('\n');

      message += 'Доставка бесплатно\n';

      if (body.deliveryType === 'courier') {
        message += 'Курьер\n';
        message += `Адрес: ${body.courierDelivery.address}\n\n`;
      } else if (body.deliveryType === 'cdek') {
        message += 'Сдэк\n';
        message += `Адрес: ${body.courierDelivery.address}\n`;
      }

      const sum = req.body.items.reduce(
        (acc, item) => (acc += item.cost * item.count),
        0
      );
      message += `Итого: ${sum}\n`;
      if (req.body.status === 'pending') {
        message += `Статус: Проверяем оплату\n`;
      }
      if (req.body.status === 'payed') {
        message += 'Статус: Заказ оплачен, передаём в службу доставки\n';
      }
      await req.server.bot.api.sendMessage(req.body.userId, message);
      return reply.send();
    }
  );
}
