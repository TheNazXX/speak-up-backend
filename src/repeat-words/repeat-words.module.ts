import { Module } from '@nestjs/common';
import { RepeatWordsService } from './repeat-words.service';
import { RepeatWordsController } from './repeat-words.controller';

@Module({
  imports: [],
  controllers: [RepeatWordsController],
  providers: [RepeatWordsService],
})
export class RepeatWordsModule {}
