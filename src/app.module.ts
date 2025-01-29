import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdsModule } from './ads/ads.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AdsModule, CampaignsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
