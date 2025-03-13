import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';

export const deliveryTypeEnum = pgEnum('delivery_type', ['courier', 'CDEK']);
export const orderStatuses = pgEnum('order_status', ['payed', 'delivered']);

export const itemsTable = pgTable('Item', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 512 }).notNull(),
  mainImage: varchar({ length: 1024 }),
  otherImages: varchar({ length: 1024 }).array().notNull(),
  description: varchar({ length: 1024 }),
  descriptors: varchar({ length: 512 }).array().notNull(),
});

export const itemCharacteristicsTables = pgTable('Item_Characteristics', {
  itemId: integer('item_id')
    .primaryKey()
    .references(() => itemsTable.id),
  region: varchar({ length: 512 }),
  country: varchar({ length: 512 }),
  roasting: varchar({ length: 512 }),
  cultivation: varchar({ length: 512 }),
  height: integer(),
  quality: varchar({ length: 512 }),
});

export const itemCostsTable = pgTable('Item_Cost', {
  itemId: integer('item_id').primaryKey().notNull(),
  cost: integer().notNull(),
  discountCost: integer('discount_cost'),
});

export const grainItemVarsTable = pgTable('grain_item_var', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cost: integer().notNull(),
  weight: integer().notNull(),
  grainItemId: integer()
    .notNull()
    .references(() => itemsTable.id),
});

export const chaptersTables = pgTable('Chapter', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  title: varchar({ length: 512 }).notNull(),
  description: varchar({ length: 1024 }),
  categoryType: varchar('category_type', {
    length: 256,
    enum: ['dripPack', 'other', 'grain'],
  }),
});

export const itemsToChaptersTable = pgTable('Item_Chapter', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  itemId: integer()
    .notNull()
    .references(() => itemsTable.id),
  chapterId: integer()
    .notNull()
    .references(() => chaptersTables.id),
});

export const usersTable = pgTable('User', {
  id: integer().primaryKey(),
  firstName: varchar('first_name', { length: 512 }),
  lastName: varchar('last_name', { length: 512 }),
  username: varchar('username', { length: 512 }),
  phone: varchar('phone', { length: 512 }),
});

export const userFavoriteItemsTable = pgTable('User_Favorite_Item', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  itemId: integer()
    .notNull()
    .references(() => itemsTable.id),
});

export const grindingTypesTables = pgTable('Gringing_Type', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  title: varchar({ length: 512 }).notNull(),
});

export const ordersTable = pgTable('Order', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  deliveryType: deliveryTypeEnum().default('CDEK'),
  firstName: varchar({ length: 256 }),
  lastName: varchar({ length: 256 }),
  middleName: varchar({ length: 256 }),
  nickname: varchar({ length: 256 }),
  phone: varchar({ length: 256 }),
  cdekAddress: varchar({ length: 256 }),
  date: varchar({ length: 256 }),
  time: varchar({ length: 256 }),
  comment: varchar({ length: 256 }),
  orderStatus: orderStatuses().default('payed'),
});

export const orderItemsTable = pgTable('Item_Order', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  itemId: integer()
    .notNull()
    .references(() => itemsTable.id),
  grindingTypeItemId: integer().references(() => grindingTypesTables.id),
  grainItemVarId: integer().references(() => grainItemVarsTable.id),
  orderId: integer()
    .notNull()
    .references(() => ordersTable.id),
});

export const chapterRelations = relations(chaptersTables, ({ many }) => ({
  itemsToChapters: many(itemsToChaptersTable),
}));
export const itemsToChapterRelations = relations(
  itemsToChaptersTable,
  ({ one, many }) => ({
    chapterId: one(chaptersTables, {
      fields: [itemsToChaptersTable.chapterId],
      references: [chaptersTables.id],
    }),
    item: one(itemsTable, {
      fields: [itemsToChaptersTable.itemId],
      references: [itemsTable.id],
    }),
  })
);
export const itemsRelations = relations(itemsTable, ({ one, many }) => ({
  cost: one(itemCostsTable, {
    fields: [itemsTable.id],
    references: [itemCostsTable.itemId],
  }),
  chars: one(itemCharacteristicsTables, {
    fields: [itemsTable.id],
    references: [itemCharacteristicsTables.itemId],
  }),
  grainConfigs: many(grainItemVarsTable),
  favoriteItems: many(userFavoriteItemsTable),
}));

export const grainItemCostsRelations = relations(
  grainItemVarsTable,
  ({ one }) => ({
    item: one(itemsTable, {
      fields: [grainItemVarsTable.grainItemId],
      references: [itemsTable.id],
    }),
  })
);
export const userRelations = relations(usersTable, ({ one, many }) => ({
  items: many(userFavoriteItemsTable),
}));

export const favoriteUserItemRelations = relations(
  userFavoriteItemsTable,
  ({ one }) => ({
    item: one(itemsTable, {
      fields: [userFavoriteItemsTable.itemId],
      references: [itemsTable.id],
    }),
  })
);
