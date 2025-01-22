import {
  Controller,
  Get,
  Delete,
  Param,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
    let repeatWords = await this.repeatWordsService.getAll();

    if (!!repeatWords.length) {
      return {
        data: repeatWords,
        message: 'Firsly you need repeat currently words',
      };
    }

    const isRepeatingToday = await this.repeatWordsService.isRepeatingToday();

    if (isRepeatingToday) {
      return {
        data: [],
        message: 'You repeated words today',
      };
    }

    repeatWords = await this.repeatWordsService.createDailySession();

    await this.globalSettingsService.updateRepeatWordsDate();

    return {
      data: repeatWords,
    };
  }

  @Post('/correct')
  @UsePipes(new ValidationPipe())
  async updateCorrectWords(@Body() updateCorrectWordsDto: { idx: string[] }) {
    const data = await this.repeatWordsService.updateCorrectWords(
      updateCorrectWordsDto.idx,
    );

    return { data };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async postRepeatWords(@Body() postRepeatWordsDto: { idx: string[] }) {
    const data = await this.repeatWordsService.addRepeatWords(
      postRepeatWordsDto.idx,
    );

    return { message: 'Words was succesfully added' };
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
