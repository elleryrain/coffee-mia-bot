import { Inject, Injectable } from '@nestjs/common';
import { DrizzlePg } from '../db/db.module';
import {
  chaptersTables,
  itemsTable,
  itemsToChaptersTable,
} from '../drizzle/schemas/schema';
import { eq } from 'drizzle-orm';
import { image } from '@nextui-org/react';

@Injectable()
export class ItemServiceDB {
  constructor(@Inject('DB') private db: DrizzlePg) {}
  async getGrainItem(userId: number) {
    const items = await this.db.query.chaptersTables.findMany({
      where: (chaptersTables, { eq }) =>
        eq(chaptersTables.categoryType, 'grain'),

      with: {
        itemsToChapters: {
          with: {
            item: {
              with: {
                favoriteItems: true,
              },
            },
          },
          columns: {},
        },
      },
    });
    const transformedItems = items.map((chapter) => ({
      nameCategory: chapter.title,
      description: chapter.description,
      items: chapter.itemsToChapters.map((item) => ({
        id: item.item.id,
        title: item.item.title,
        image: item.item.mainImage,
        favorite: item.item.favoriteItems.some((fav) => fav.userId === userId),
      })),
    }));
    return transformedItems;
  }
  async getDripPacks(userId: number) {
    const items = await this.db.query.chaptersTables.findMany({
      where: (chaptersTables, { eq }) =>
        eq(chaptersTables.categoryType, 'dripPack'),
      with: {
        itemsToChapters: {
          with: {
            item: {
              with: {
                cost: true,
                favoriteItems: true,
              },
            },
          },
          columns: {},
        },
      },
    });
    console.log(JSON.stringify(items, null, 4));
    const transformedItems = items.map((chapter) => ({
      nameCategory: chapter.id,
      description: chapter.description,
      items: chapter.itemsToChapters.map((item) => ({
        id: item.item.id,
        title: item.item.title,
        image: item.item.mainImage,
        favorite: item.item.favoriteItems.some((fav) => fav.userId === userId),
        cost: item.item.cost.cost ? item.item.cost.cost : null,
        discountCos: item.item.cost.discountCost
          ? item.item.cost.discountCost
          : null,
      })),
    }));
    return transformedItems;
  }
  async getOtherItems(userId: number) {
    const items = await this.db.query.chaptersTables.findMany({
      where: (chaptersTables, { eq }) =>
        eq(chaptersTables.categoryType, 'other'),
      with: {
        itemsToChapters: {
          with: {
            item: {
              with: {
                cost: true,
                favoriteItems: true,
              },
            },
          },
          columns: {},
        },
      },
    });
    console.log(items);
    const transformedItems = items.map((chapter) => ({
      nameCategory: chapter.title,
      description: chapter.description,
      items: chapter.itemsToChapters.map((item) => ({
        id: item.item.id,
        title: item.item.title,
        image: item.item.mainImage,
        favorite: item.item.favoriteItems.some((fav) => fav.userId === userId),
        cost: item.item.cost ? item.item.cost.cost : null,
        discountCost:
          item.item.cost && item.item.cost.discountCost
            ? item.item.cost.discountCost
            : null,
      })),
    }));
    return transformedItems;
  }

  async getExtendedItemById(itemId: number, userId: number) {
    console.log(itemId);
    const item = await this.db.query.itemsTable.findFirst({
      where: (itemsTable, { eq }) => eq(itemsTable.id, itemId),
      with: {
        chars: true,
        grainConfigs: true,
        favoriteItems: true,
      },
    });
    if (!item) return null;

    const transformedItem = {
      id: item.id,
      title: item.title,
      description: item.description,
      descriptors: item.descriptors,
      region: item.chars?.region,
      country: item.chars?.country,
      roasting: item.chars?.roasting,
      cultivation: item.chars?.cultivation,
      height: item.chars?.height,
      quality: item.chars?.quality,
      images: [item.mainImage, ...item.otherImages],
      configurations: item.grainConfigs.map((config) => ({
        id: config.id,
        cost: config.cost,
        weight: config.weight,
      })),
      favorite: item.favoriteItems.some((fav) => fav.userId === userId),
    };

    return transformedItem;
  }
}
