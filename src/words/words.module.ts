import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsEntity } from './entities/word.entity';
import { PartsOfSpeechEntity } from 'src/entities/partOfSpeech.entity';
import { SentenceEntity } from 'src/sentences/sentence.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WordsEntity,
      PartsOfSpeechEntity,
      SentenceEntity,
    ]),
  ],
  providers: [WordsService],
  controllers: [WordsController],
})
export class WordsModule {}
