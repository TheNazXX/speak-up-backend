import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RepeatPhrasesService } from './repeat-phrases.service';
import { CreateRepeatPhraseDto } from './dto/create-repeat-phrase.dto';
import { UpdateRepeatPhraseDto } from './dto/update-repeat-phrase.dto';
import { GlobalSettingsService } from 'src/global-settings/global-settings.service';

@Controller('repeat-phrases')
export class RepeatPhrasesController {
  constructor(
    private readonly repeatPhrasesService: RepeatPhrasesService,
    private readonly globalSettingsService: GlobalSettingsService,
  ) {}

  @Get('/daily')
  async getDailyRepeatPhrases() {
    let repeatPhrases = await this.repeatPhrasesService.getAll();

    if (!!repeatPhrases.length) {
      return {
        repeatPhrases,
        message: 'First repeat this phrases',
      };
    }

    const isRepeatingToday = await this.repeatPhrasesService.isRepeatingToday();

    if (isRepeatingToday) {
      return {
        data: [],
        message: 'Already repeat today',
      };
    }

    repeatPhrases = await this.repeatPhrasesService.createDailySession();

    await this.globalSettingsService.updateRepeatPhrasesDate();

    return repeatPhrases;
  }
}
