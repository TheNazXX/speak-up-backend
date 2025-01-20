import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRepeatPhraseDto } from './dto/create-repeat-phrase.dto';
import { UpdateRepeatPhraseDto } from './dto/update-repeat-phrase.dto';
import { GlobalSettingsService } from 'src/global-settings/global-settings.service';
import { RepeatPhraseEntity } from './entities/repeat-phrase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RepeatWordsEntity } from 'src/repeat-words/entities/repeat-word.entity';
import { EntityManager, Repository } from 'typeorm';
import { PhrasesService } from 'src/phrases/phrases.service';

@Injectable()
export class RepeatPhrasesService {
  constructor(
    @InjectRepository(RepeatPhraseEntity)
    private readonly repeatPhrasesEntity: Repository<RepeatPhraseEntity>,
    private readonly phrasesService: PhrasesService,
    private readonly globalSettingsService: GlobalSettingsService,
    private readonly entityManager: EntityManager,
  ) {}

  async getAll() {
    return this.repeatPhrasesEntity.find({ relations: { phrase: true } });
  }

  async isRepeatingToday() {
    const { lastRepeatingPhrasesDate } =
      await this.globalSettingsService.getLastRepeatingPhraseDate();

    let lastDay = new Date(lastRepeatingPhrasesDate);
    let today = new Date();

    today.setHours(0, 0, 0, 0);
    lastDay.setHours(0, 0, 0, 0);

    return lastDay.getTime() === today.getTime();
  }

  async createDailySession() {
    const phrases = await this.phrasesService.getLastAddedPhrases();

    for (const phrase of phrases) {
      const repeatWord = await this.repeatPhrasesEntity.create({
        phrase: phrase,
        en: phrase.en,
      });

      await this.entityManager.save(repeatWord);
    }

    const repeatPhrases = await this.repeatPhrasesEntity.find({
      relations: { phrase: true },
    });

    return repeatPhrases;
  }

  async addRepeatPhrases(idx: string[]) {
    const isRepeatData = await this.getAll();

    if (!!isRepeatData.length) {
      throw new BadRequestException('Firstly you need repeat current phrases');
    }

    for (const id of idx) {
      const phrase = await this.phrasesService.findById(id);
      const repeatPhrase = this.repeatPhrasesEntity.create({
        en: phrase.en,
        phrase: phrase,
      });

      await this.entityManager.save(repeatPhrase);
    }
  }

  async updateCorrectPhrases(idx: string[]) {
    for (const id of idx) {
      await this.repeatPhrasesEntity.delete({ id });
    }

    return await this.repeatPhrasesEntity.find({
      relations: { phrase: true },
    });
  }
}
