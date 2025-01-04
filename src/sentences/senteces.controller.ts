import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { SentenceEntity } from './entities/sentence.entity';
import { SentencesService } from './sentences.service';
import { UpdateSentenceDto } from './dtos/update-sentence-dto';

@Controller('sentences')
export class SentencesController {
  constructor(private sentenceService: SentencesService) {}

  @Get()
  async getByWord(@Query('word') word: string) {
    return await this.sentenceService.getByWord(word);
  }

  @Get()
  async getAll() {
    return await this.sentenceService.getAll();
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updateSentenceDto: UpdateSentenceDto,
  ) {
    return await this.sentenceService.update(id, updateSentenceDto.text);
  }
}
