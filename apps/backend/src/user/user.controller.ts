import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserServiceDB } from './user-db.service';
import { TBodyOrderItem } from './dto/order';
import { UserOrderService } from './user-order.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userServiceDB: UserServiceDB,
    private readonly userOrderService: UserOrderService
  ) {}

  @Get()
  async getUserHandler(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    const userData = req.raw.user;
    let userDb = await this.userServiceDB.getUserById(userData.id);
    if (!userDb) {
      userDb = await this.userServiceDB.insertUser(userData);
    }
    return reply.send(userDb);
  }

  @Post('favorite')
  async insertFavoriteItemHandler(
    @Req() req: FastifyRequest<{ Body: { itemId: number } }>,
    @Res() reply: FastifyReply
  ) {
    const userId = req.raw.user.id;
    const itemId = req.body.itemId;
    // console.log(userId, itemId);
    const checkItem = await this.userServiceDB.checkFavoriteItemUser(
      userId,
      itemId
    );

    if (checkItem) {
      return reply.code(200).send({ message: 'item already exists' });
    }

    const res = await this.userServiceDB.insertFavoriteUserItem(userId, itemId);
    if (res === undefined) {
      return reply.code(500).send({ message: 'unknow error' });
    }
    return reply.send(res);
  }

  @Get('favorite')
  async getFavoriteItemsHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    const userId = req.raw.user.id;
    const items = await this.userServiceDB.getUserFavoriteItems(userId);
    return reply.send(items);
  }

  @Delete('favorite')
  async geleteFavoriteItemHandler(
    @Req()
    req: FastifyRequest<{
      Body: {
        itemId: number;
      };
    }>,
    @Res() reply: FastifyReply
  ) {
    const userId = req.raw.user.id;
    const { itemId } = req.body;
    const res = await this.userServiceDB.deleteUserFavoriteItem(userId, itemId);

    if (res === null) {
      return reply.send({ message: 'success' });
    }

    return reply.send({ message: 'error on delete' });
  }
  @Put('phone')
  async updateProfilePhoneHandler(
    @Req() req: FastifyRequest,
    @Body() body: { phone: string },
    @Res() reply: FastifyReply
  ) {
    const { id } = req.raw.user;
    const updatedUser = await this.userServiceDB.updateUserPhone(
      id,
      body.phone
    );
    return reply.send(updatedUser);
  }
  @Put('name')
  async updateProfileNameHandler(
    @Req() req: FastifyRequest,
    @Body() body: { firstName: string; lastName: string },
    @Res() reply: FastifyReply
  ) {
    const { id } = req.raw.user;
    const updatedUser = await this.userServiceDB.updateUserName(
      id,
      body.firstName,
      body.lastName
    );
    return reply.send(updatedUser);
  }
  @Put('username')
  async updateProfileUsernameHandler(
    @Req() req: FastifyRequest,
    @Body() body: { username: string },
    @Res() reply: FastifyReply
  ) {
    const { id } = req.raw.user;
    const updatedUser = await this.userServiceDB.updateUserUsername(
      id,
      body.username
    );
    return reply.send(updatedUser);
  }

  @Post('order')
  async orderItemsHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() body: { items: TBodyOrderItem[] }
  ) {
    const { id } = req.raw.user;
    const items = await this.userOrderService.orderItems(id, body.items);
    return reply.send(items);
  }

  @Get('order')
  async getOrderItemsHandler(@Res() reply: FastifyReply) {
    return reply.send([]);
  }
}
