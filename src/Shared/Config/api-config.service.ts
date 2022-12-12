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

  get hashSaltsPasswords(): number {
    return this.configService.get('HASH_SALTS_PASSWORDS');
  }

  get jwtConfigs() {
    return {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_TTL'),
    };
  }
}
