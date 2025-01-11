import { Module } from '@nestjs/common';
import { GlobalSettingsService } from './global-settings.service';
import { GlobalSettingsController } from './global-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalSettingsEntity } from './entities/global-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalSettingsEntity])],
  controllers: [GlobalSettingsController],
  providers: [GlobalSettingsService],
  exports: [GlobalSettingsService],
})
export class GlobalSettingsModule {}
