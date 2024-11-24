import { Module } from '@nestjs/common';
import { RepeatWordsService } from './repeat-words.service';
import { RepeatWordsController } from './repeat-words.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from 'src/schemas/Word.schema';
import { RepeatWords, RepeatWordsShema } from 'src/schemas/RepeatWords.chema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Word.name,
        schema: WordSchema,
      },
      {
        name: RepeatWords.name,
        schema: RepeatWordsShema,
      },
    ]),
  ],
  controllers: [RepeatWordsController],
  providers: [RepeatWordsService],
})
export class RepeatWordsModule {}
