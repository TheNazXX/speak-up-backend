import { Module } from '@nestjs/common';
import { SentencesService } from '../sentences.service';
import { SentencesController } from '../senteces.controller';
import { SentenceEntity } from './sentence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsEntity } from 'src/words/entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SentenceEntity, WordsEntity])],
  controllers: [SentencesController],
  providers: [SentencesService],
})
export class SentencesModule {}
