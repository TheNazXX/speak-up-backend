import { Module } from '@nestjs/common';
import { TextsService } from './texts.service';
import { TextsController } from './texts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Text, TextSchema } from 'src/schemas/Text.schema';
import { Word, WordSchema } from 'src/schemas/Word.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Text.name,
        schema: TextSchema,
      },
      {
        name: Word.name,
        schema: WordSchema,
      },
    ]),
  ],
  controllers: [TextsController],
  providers: [TextsService],
})
export class TextsModule {}
