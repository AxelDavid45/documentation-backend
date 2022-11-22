import { Module } from '@nestjs/common';
import { SharedModule } from './Shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiConfigService } from './Shared/Config/api-config.service';
import { ConceptModule } from './Concepts/concept.module';
import { PackageModule } from './Packages/package.module';
import { UserModule } from './Users/user.module';
import { ClientModule } from './Clients/client.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (apiConfigService: ApiConfigService) => ({
        uri: apiConfigService.databaseUri,
        retryAttempts: 2,
        connectionErrorFactory: () => {
          console.error(
            `App can not connect to database using ${apiConfigService.databaseUri}`,
          );
        },
      }),
      inject: [ApiConfigService],
    }),
    ConceptModule,
    PackageModule,
    UserModule,
    ClientModule,
    SharedModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
