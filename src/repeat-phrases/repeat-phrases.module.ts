import { Module } from '@nestjs/common';
import { RepeatPhrasesService } from './repeat-phrases.service';
import { RepeatPhrasesController } from './repeat-phrases.controller';

@Module({
  controllers: [RepeatPhrasesController],
  providers: [RepeatPhrasesService],
})
export class RepeatPhrasesModule {}
