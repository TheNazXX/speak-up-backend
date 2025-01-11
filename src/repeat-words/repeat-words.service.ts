import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual } from 'typeorm';
import { WordsEntity } from 'src/words/entities/word.entity';

import { IWord } from 'src/words/types/words.types';
import { EntityManager, Repository } from 'typeorm';
import { RepeatWordsEntity } from './entities/repeat-word.entity';
import { GlobalSettingsService } from 'src/global-settings/global-settings.service';

@Injectable()
export class RepeatWordsService {
  constructor(
    @InjectRepository(WordsEntity)
    private readonly wordsEntityRepository: Repository<WordsEntity>,

    @InjectRepository(RepeatWordsEntity)
    private readonly repeatWordsEntity: Repository<RepeatWordsEntity>,

    private readonly globalSettingsService: GlobalSettingsService,

    private readonly entityManager: EntityManager,
  ) {}

  async isRepeatingToday() {
    const { lastRepeatingWordsDate } =
      await this.globalSettingsService.getLastRepeatingWordsDate();

    let lastDay = new Date(lastRepeatingWordsDate);
    let today = new Date();

    today.setHours(0, 0, 0, 0);
    lastDay.setHours(0, 0, 0, 0);

    return lastDay.getTime() === today.getTime();
  }
}
