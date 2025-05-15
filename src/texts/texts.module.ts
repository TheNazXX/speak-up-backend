import { Module } from '@nestjs/common';
import { TextsService } from './texts.service';
import { TextsController } from './texts.controller';
import { WordsModule } from 'src/words/words.module';
import { PhrasesModule } from 'src/phrases/phrases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextEnitity } from './entities/text.entity';

@Module({
  imports: [
    WordsModule,
    PhrasesModule,
    TypeOrmModule.forFeature([TextEnitity]),
  ],
  controllers: [TextsController],
  providers: [TextsService],
})
export class TextsModule {}
