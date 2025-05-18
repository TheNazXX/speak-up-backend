import { Module } from '@nestjs/common';
import { SentencesService } from '../sentences.service';
import { SentencesController } from '../senteces.controller';
import { SentenceEntity } from './sentence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SentenceEntity])],
  controllers: [SentencesController],
  providers: [SentencesService],
  exports: [SentencesService],
})
export class SentencesModule {}
