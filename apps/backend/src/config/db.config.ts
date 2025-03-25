import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}
  getDatabaseUrl() {
    const dbUrl = this.configService.get<string>('DATABASE_URL') as string;
    return dbUrl;
  }
}
