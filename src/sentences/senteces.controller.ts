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
  Delete,
} from '@nestjs/common';
import { SentenceEntity } from './entities/sentence.entity';
import { SentencesService } from './sentences.service';
import { UpdateSentenceDto } from './dtos/update-sentence-dto';

@Controller('sentences')
export class SentencesController {
  constructor(private sentenceService: SentencesService) {}

  @Get('/word')
  async getByWord(@Query('en') word: string) {
    return await this.sentenceService.getByWord(word);
  }

  @Get('/phrase')
  async getByPhrase(@Query('en') phrase: string) {
    return await this.sentenceService.getByPhrase(phrase);
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

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.sentenceService.delete(id);
  }
}
