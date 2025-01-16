import { Module } from '@nestjs/common';
import { RepeatPhrasesService } from './repeat-phrases.service';
import { RepeatPhrasesController } from './repeat-phrases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepeatPhraseEntity } from './entities/repeat-phrase.entity';
import { GlobalSettingsEntity } from 'src/global-settings/entities/global-setting.entity';
import { PhrasesEntity } from 'src/phrases/entities/phrase.entity';
import { GlobalSettingsService } from 'src/global-settings/global-settings.service';
import { GlobalSettingsModule } from 'src/global-settings/global-settings.module';
import { PhrasesModule } from 'src/phrases/phrases.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RepeatPhraseEntity,
      PhrasesEntity,
      GlobalSettingsEntity,
    ]),
    GlobalSettingsModule,
    PhrasesModule,
  ],
  controllers: [RepeatPhrasesController],
  providers: [RepeatPhrasesService],
})
export class RepeatPhrasesModule {}
