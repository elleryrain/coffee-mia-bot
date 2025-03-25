import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PortConfigService {
  constructor(private readonly configService: ConfigService) {}
  getBackendPort() {
    const backendPort = this.configService.get<number>('BACKEND_PORT', {
      infer: true,
    }) as number;
    return Number(backendPort);
  }
}
