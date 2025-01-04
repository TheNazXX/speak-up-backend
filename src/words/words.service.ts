import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateWordDto, UpdateWordDto } from './dtos/create-word-dto';
import { EntityManager, Repository } from 'typeorm';
import { WordsEntity } from './entities/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PartsOfSpeechEntity } from 'src/entities/partOfSpeech.entity';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordsEntity)
    private wordsEntityRepository: Repository<WordsEntity>,
    @InjectRepository(PartsOfSpeechEntity)
    private partsOfSpeechEntityRepository: Repository<PartsOfSpeechEntity>,
    @InjectRepository(SentenceEntity)
    private sentenceEntityRepository: Repository<SentenceEntity>,
    private readonly enitiyManager: EntityManager,
  ) {}

  async create(createWordDto: CreateWordDto) {
    const partOfSpeech = await this.partsOfSpeechEntityRepository.findOne({
      where: { name: createWordDto.partOfSpeech },
    });

    const isConsistWord = await this.wordsEntityRepository.findOne({
      where: { en: createWordDto.en },
    });

    if (isConsistWord) {
      throw new ConflictException('Word already consist!');
    }

    if (!partOfSpeech) {
      throw new NotFoundException('Unknown part of speech!');
    }

    const sentences = createWordDto.sentences.map(
      (createSentenceDto) => new SentenceEntity({ text: createSentenceDto }),
    );

    const word = await this.wordsEntityRepository.create({
      ...createWordDto,
      en: createWordDto.en.trim(),
      sentences,
      partOfSpeech: partOfSpeech,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.enitiyManager.save(word);
  }

  async update(wordName: string, updateWordDto: UpdateWordDto) {
    const wordData = await this.wordsEntityRepository.findOneBy({
      en: wordName,
    });

    if (updateWordDto.en) {
      wordData.en = updateWordDto.en;
    }

    if (updateWordDto.translate) {
      wordData.translate = updateWordDto.translate;
    }

    return await this.enitiyManager.save(wordData);
  }

  async get(en: string) {
    return await this.wordsEntityRepository.findOne({
      where: { en },

      relations: { sentences: true, partOfSpeech: true },
    });
  }

  async getAll() {
    return await this.wordsEntityRepository.find({});
  }

  async deleteByEn(en: string) {
    return await this.wordsEntityRepository.delete({ en });
  }
}
