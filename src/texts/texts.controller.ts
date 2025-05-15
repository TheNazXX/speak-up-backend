import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ConflictException,
} from '@nestjs/common';
import { TextsService } from './texts.service';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AccordingTextWords, CreateTextDto } from './dto/create-text.dto';
import { plainToInstance } from 'class-transformer';
import { TextDto } from './dto/get-text.dto';
import { WordsService } from 'src/words/words.service';
import { WordsEntity } from 'src/words/entities/word.entity';
import { PhrasesService } from 'src/phrases/phrases.service';
import { PhrasesEntity } from 'src/phrases/entities/phrase.entity';

@Controller('texts')
export class TextsController {
  constructor(
    private readonly textsService: TextsService,
    private readonly wordsService: WordsService,
    private readonly phrasesService: PhrasesService,
  ) {}

  @Post()
  async create(@Body() createTextDto: CreateTextDto<AccordingTextWords[]>) {
    const words = createTextDto.enities.filter((word) => word.type === 'word');
    const phrases = createTextDto.enities.filter(
      (word) => word.type === 'phrase',
    );

    const wordCreationPromises = words.map(async (word) => {
      try {
        return await this.wordsService.create({
          en: word.en,
          translate: word.translate,
          partOfSpeech: 'unknown',
          sentences: [],
        });
      } catch (error) {
        if (error instanceof ConflictException) {
          return this.wordsService.findByEn(word.en);
        }
        return null;
      }
    });

    const phrasesCreationPromises = phrases.map(async (phrase) => {
      try {
        return await this.phrasesService.create({
          en: phrase.en,
          translate: phrase.translate,
          sentences: [],
        });
      } catch (error) {
        if (error instanceof ConflictException) {
          return this.phrasesService.findByEn(phrase.en);
        }
        return null;
      }
    });

    const createdWords = words.length
      ? ((await Promise.all(wordCreationPromises)).filter(
          Boolean,
        ) as WordsEntity[])
      : null;

    const createdPhrases = phrases.length
      ? ((await Promise.all(phrasesCreationPromises)).filter(
          Boolean,
        ) as PhrasesEntity[])
      : null;

    return this.textsService.create({
      name: createTextDto.name,
      content: createTextDto.content,
      enities: {
        words: createdWords,
        phrases: createdPhrases,
      },
    });
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async getAll() {
    const data = plainToInstance(TextDto, await this.textsService.getAll());
    return {
      message: 'Texts found successfully',
      data,
      status: 200,
    };
  }

  @Get('/:name')
  async getByName(@Param('name') name: string) {
    const data = plainToInstance(
      TextDto,
      await this.textsService.getByName(name),
    );

    return {
      message: 'Text found successfully',
      data,
      status: 200,
    };
  }
}
