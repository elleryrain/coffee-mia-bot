import { Inject, Injectable } from '@nestjs/common';
import { DrizzlePg } from '../db/db.module';
import { grindingTypesTables } from '../drizzle/schemas/schema';

@Injectable()
export class GrindingTypesDB {
  constructor(@Inject('DB') private db: DrizzlePg) {}
  async getGrindingTypes() {
    const grindingTypes = await this.db.select().from(grindingTypesTables);
    return grindingTypes;
  }
}
