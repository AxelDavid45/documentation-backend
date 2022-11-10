import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get env(): boolean {
    return this.configService.get('NODE_ENV');
  }

  get databaseUri(): string {
    return this.configService.get('MONGO_URI');
  }

  get appPort(): number {
    return this.configService.get('PORT');
  }
}
