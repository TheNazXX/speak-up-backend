import { Module } from '@nestjs/common';
import { RepeatWordsService } from './repeat-words.service';
import { RepeatWordsController } from './repeat-words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsEntity } from 'src/words/entities/word.entity';
import { RepeatWordsEntity } from './entities/repeat-word.entity';
import { GlobalSettingsEntity } from 'src/global-settings/entities/global-setting.entity';
import { GlobalSettingsModule } from 'src/global-settings/global-settings.module';
import { WordsModule } from 'src/words/words.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WordsEntity,
      RepeatWordsEntity,
      GlobalSettingsEntity,
    ]),
    GlobalSettingsModule,
    WordsModule,
  ],
  controllers: [RepeatWordsController],
  providers: [RepeatWordsService],
})
export class RepeatWordsModule {}
