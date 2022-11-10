import { Module } from '@nestjs/common';
import { SharedModule } from './Shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiConfigService } from './Shared/Config/api-config.service';
import { ConceptModule } from './Concepts/concept.module';
import { PackageModule } from './Packages/package.module';
import { UserModule } from './Users/user.module';
import { ClientModule } from './Clients/client.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (apiConfigService: ApiConfigService) => ({
        uri: apiConfigService.databaseUri,
      }),
      inject: [ApiConfigService],
    }),
    ConceptModule,
    PackageModule,
    UserModule,
    ClientModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
