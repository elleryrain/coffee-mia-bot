import { Module } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as sc from '../drizzle/schemas/schema';

import { databaseUrl } from '../config/env';

export type DrizzlePg = NodePgDatabase<typeof sc>;

@Module({
  imports: [],
  providers: [
    {
      provide: 'DB',
      useFactory: () => {
        const db = drizzle(databaseUrl, { schema: sc });
        return db;
      },
      inject: [],
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
