import { Inject, Injectable } from '@nestjs/common';
import { DrizzlePg } from '../db/db.module';
import { userFavoriteItemsTable, usersTable } from '../drizzle/schemas/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class UserServiceDB {
  constructor(@Inject('DB') private db: DrizzlePg) {}
  async getUserById(id: number) {
    const user = await this.db.query.usersTable.findFirst({
      where: (usersTable, { eq }) => eq(usersTable.id, id),
    });
    return user;
  }
  async insertUser(userData: typeof usersTable.$inferInsert) {
    const [user] = await this.db
      .insert(usersTable)
      .values(userData)
      .returning();
    return user;
  }
  async checkFavoriteItemUser(userId: number, itemId: number) {
    const items = await this.db
      .select()
      .from(userFavoriteItemsTable)
      .where(
        and(
          eq(userFavoriteItemsTable.userId, userId),
          eq(userFavoriteItemsTable.itemId, itemId)
        )
      );
    console.log(items);
    if (items.length === 0) {
      return false;
    }
    return true;
  }
  async insertFavoriteUserItem(userId: number, itemId: number) {
    try {
      const [favoriteItem] = await this.db
        .insert(userFavoriteItemsTable)
        .values({ itemId: itemId, userId: userId })
        .returning();
      return favoriteItem;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
  async getUserFavoriteItems(userId: number) {
    const items = await this.db.query.userFavoriteItemsTable.findMany({
      where: (userFavoriteItemsTable, { eq }) =>
        eq(userFavoriteItemsTable.userId, userId),
      with: {
        item: true,
      },
    });

    const transformedItems = items.map((item) => ({
      id: item.itemId,
      title: item.item.title,
      image: item.item.mainImage,
      favorite: true,
    }));

    return transformedItems;
  }
  async deleteUserFavoriteItem(userId: number, itemId: number) {
    try {
      await this.db
        .delete(userFavoriteItemsTable)
        .where(
          and(
            eq(userFavoriteItemsTable.userId, userId),
            eq(userFavoriteItemsTable.itemId, itemId)
          )
        );
      return null;
    } catch (err) {
      console.error(err);
      return 'error';
    }
  }
  async updateUserPhone(userId: number, phone: string) {
    const [user] = await this.db
      .update(usersTable)
      .set({ phone })
      .where(eq(usersTable.id, userId))
      .returning();
    return user;
  }
  async updateUserUsername(userId: number, username: string) {
    const [user] = await this.db
      .update(usersTable)
      .set({ username })
      .where(eq(usersTable.id, userId))
      .returning();
    return user;
  }
  async updateUserName(userId: number, firstName: string, lastName: string) {
    const [user] = await this.db
      .update(usersTable)
      .set({ firstName, lastName })
      .where(eq(usersTable.id, userId))
      .returning();
    return user;
  }
}
