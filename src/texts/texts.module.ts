import { Module } from '@nestjs/common';
import { TextsService } from './texts.service';
import { TextsController } from './texts.controller';

@Module({
  imports: [],
  controllers: [TextsController],
  providers: [TextsService],
})
export class TextsModule {}
