import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from 'src/schemas/Word.schema';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Word.name,
        schema: WordSchema,
      },
    ]),
  ],
  providers: [WordsService],
  controllers: [WordsController],
})
export class WordsModule {}
