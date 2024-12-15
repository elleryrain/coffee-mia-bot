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
  async getGrainItem() {
    const items = await this.db.query.chaptersTables.findMany({
      where: (chaptersTables, { eq }) =>
        eq(chaptersTables.categoryType, 'grain'),
      with: {
        itemsToChapters: {
          with: {
            item: true,
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
        favorite: false,
      })),
    }));
    return transformedItems;
  }
  async getDripPacks() {
    const items = await this.db.query.chaptersTables.findMany({
      where: (chaptersTables, { eq }) =>
        eq(chaptersTables.categoryType, 'dripPack'),
      with: {
        itemsToChapters: {
          with: {
            item: {
              with: {
                cost: true,
              },
            },
          },
          columns: {},
        },
      },
    });
    console.log(JSON.stringify(items));
    const transformedItems = items.map((chapter) => ({
      nameCategory: chapter.id,
      description: chapter.description,
      items: chapter.itemsToChapters.map((item) => ({
        id: item.item.id,
        title: item.item.title,
        image: item.item.mainImage,
        favorite: false,
        cost: item.item.cost.cost ? item.item.cost.cost : null,
        discountCos: item.item.cost.discountCost
          ? item.item.cost.discountCost
          : null,
      })),
    }));
    return transformedItems;
  }
  async getOtherItems() {
    const items = await this.db.query.chaptersTables.findMany({
      where: (chaptersTables, { eq }) =>
        eq(chaptersTables.categoryType, 'other'),
      with: {
        itemsToChapters: {
          with: {
            item: {
              with: {
                cost: true,
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
        favorite: false,
        cost:
          item.item.cost && item.item.cost.cost ? item.item.cost.cost : null,
        discountCost:
          item.item.cost && item.item.cost.discountCost
            ? item.item.cost.discountCost
            : null,
      })),
    }));
    return transformedItems;
  }
}
