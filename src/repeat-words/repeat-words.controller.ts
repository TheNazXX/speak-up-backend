import { Controller, Get, Delete, Param, Body, Post } from '@nestjs/common';
import { RepeatWordsService } from './repeat-words.service';
import { IWord } from 'src/words/types/words.types';
import { GlobalSettingsService } from 'src/global-settings/global-settings.service';

@Controller('repeat-words')
export class RepeatWordsController {
  constructor(
    private readonly repeatWordsService: RepeatWordsService,
    private readonly globalSettingsService: GlobalSettingsService,
  ) {}

  @Get('/daily')
  async getAll() {
    return this.repeatWordsService.isRepeatingToday();
  }

  @Get('/random/:count')
  async getRandomWords(@Param('count') count: number = 5) {}

  @Get()
  async getAllWords() {}

  @Post('/incorrect-words')
  async postIncorrectWords(@Body() words: IWord[]) {}

  @Delete('/all')
  async deleteAll() {}
}
