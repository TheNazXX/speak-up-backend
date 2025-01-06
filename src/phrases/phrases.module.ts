import { Module } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { PhrasesController } from './phrases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhrasesEntity } from './entities/phrase.entity';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhrasesEntity, SentenceEntity])],
  controllers: [PhrasesController],
  providers: [PhrasesService],
})
export class PhrasesModule {}
