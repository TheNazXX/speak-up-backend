import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VocabularyEntity } from './entities/vocabulary.entity';
import { PartsOfSpeechEntity } from 'src/entities/partOfSpeech.entity';
import { SentencesModule } from 'src/sentences/entities/sentences.module';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';

@Module({
  imports: [
    SentencesModule,
    TypeOrmModule.forFeature([
      VocabularyEntity,
      PartsOfSpeechEntity,
      SentenceEntity,
    ]),
  ],
  controllers: [VocabularyController],
  providers: [VocabularyService],
  exports: [VocabularyService],
})
export class VocabularyModule {}
