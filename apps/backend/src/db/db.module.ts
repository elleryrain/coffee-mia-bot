import { Module } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as sc from '../drizzle/schemas/schema';
import { DatabaseConfigService } from '../config/db.config';

export type DrizzlePg = NodePgDatabase<typeof sc>;

@Module({
  imports: [],
  providers: [
    {
      provide: 'DB',
      useFactory: (databaseConfigService: DatabaseConfigService) => {
        const databaseUrl = databaseConfigService.getDatabaseUrl();
        const db = drizzle(databaseUrl, { schema: sc });
        return db;
      },
      inject: [DatabaseConfigService],
    },
    DatabaseConfigService,
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
