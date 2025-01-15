import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual } from 'typeorm';
import { WordsEntity } from 'src/words/entities/word.entity';

import { IWord } from 'src/words/types/words.types';
import { EntityManager, Repository } from 'typeorm';
import { RepeatWordsEntity } from './entities/repeat-word.entity';
import { GlobalSettingsService } from 'src/global-settings/global-settings.service';
import { WordsService } from 'src/words/words.service';

@Injectable()
export class RepeatWordsService {
  constructor(
    @InjectRepository(WordsEntity)
    private readonly wordsEntityRepository: Repository<WordsEntity>,

    @InjectRepository(RepeatWordsEntity)
    private readonly repeatWordsEntity: Repository<RepeatWordsEntity>,

    private readonly wordsService: WordsService,
    private readonly globalSettingsService: GlobalSettingsService,

    private readonly entityManager: EntityManager,
  ) {}

  async getAll() {
    return this.repeatWordsEntity.find({ relations: { word: true } });
  }

  async createDailySession() {
    const words = await this.wordsService.getLastAddedWords();

    for (const word of words) {
      const repeatWord = this.repeatWordsEntity.create({
        word: word,
        en: word.en,
      });

      await this.entityManager.save(repeatWord);
    }

    const repeatWords = await this.repeatWordsEntity.find({
      relations: { word: true },
    });

    return repeatWords;
  }

  async updateCorrectWords(idx: string[]) {
    for (const id of idx) {
      await this.repeatWordsEntity.delete({ id });
    }

    return await this.repeatWordsEntity.find({
      relations: { word: true },
    });
  }

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
