import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PartsOfSpeechEntity } from 'src/entities/partOfSpeech.entity';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';
import { WordsEntity } from 'src/words/entities/word.entity';

@Injectable()
export class SentencesService {
  constructor(
    @InjectRepository(SentenceEntity)
    private sentenceEntityRepository: Repository<SentenceEntity>,

    @InjectRepository(WordsEntity)
    private wordsEntityRepository: Repository<WordsEntity>,
    private readonly enitiyManager: EntityManager,
  ) {}

  async getAll() {
    return await this.wordsEntityRepository.find({});
  }

  async getByWord(word: string) {
    const data = await this.wordsEntityRepository.find({
      where: { en: word },
      select: {
        sentences: true,
      },
      relations: { sentences: true },
    });

    if (!data) {
      throw new Error("Can't find the word! ");
    }

    return data.map((item) => item.sentences).flat();
  }

  async update(id: string, text: string) {
    const senteceData = await this.sentenceEntityRepository.findOneBy({ id });

    if (!senteceData) {
      throw new NotFoundException("Can't find the sentence!");
    }

    senteceData.updatedAt = new Date();
    senteceData.text = text;

    return this.enitiyManager.save(senteceData);
  }
}
