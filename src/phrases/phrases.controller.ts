import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';

@Controller('phrases')
export class PhrasesController {
  constructor(private readonly phrasesService: PhrasesService) {}

  @Post()
  async create(@Body() createPhraseDto: CreatePhraseDto) {
    return await this.phrasesService.create(createPhraseDto);
  }

  @Get()
  async findAll() {
    const data = await this.phrasesService.findAll();

    return {
      message: 'Phrases was successfilly find',
      data,
    };
  }

  @Get(':en')
  async findByEn(@Param('en') en: string) {
    const data = await this.phrasesService.findByEn(en);
    return {
      message: 'Phrase was successfully found',
      data,
    };
  }

  @Post('/:en/sentence')
  @UsePipes(new ValidationPipe())
  async addSentence(
    @Param('en') en: string,
    @Body() createSentenceDto: { sentence: string },
  ) {
    return await this.phrasesService.addSentence(
      en,
      createSentenceDto.sentence,
    );
  }
}
