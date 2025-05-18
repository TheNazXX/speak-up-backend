import { Module } from '@nestjs/common';
import { TextsService } from './texts.service';
import { TextsController } from './texts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextEnitity } from './entities/text.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TextEnitity])],
  controllers: [TextsController],
  providers: [TextsService],
})
export class TextsModule {}
