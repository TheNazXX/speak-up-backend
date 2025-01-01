import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateWordDto, UpdateWordDto } from './dtos/create-word-dto';
import { Repository } from 'typeorm';
import { WordsEntity } from './entities/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PartsOfSpeechEntity } from 'src/entities/partOfSpeech.entity';
import { SentenceEntity } from 'src/sentences/sentence.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordsEntity)
    private wordsEntityRepository: Repository<WordsEntity>,
    @InjectRepository(PartsOfSpeechEntity)
    private partsOfSpeechEntityRepository: Repository<PartsOfSpeechEntity>,
    @InjectRepository(SentenceEntity)
    private sentenceEntityRepository: Repository<SentenceEntity>,
  ) {}

  async create(createWordDto: CreateWordDto) {
    console.log(createWordDto.sentences, 'sentences');

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

    let sentences = [];

    if (!!createWordDto.sentences.length) {
      sentences = await Promise.all(
        createWordDto.sentences.map(async (text) => {
          let sentence = await this.sentenceEntityRepository.findOne({
            where: { text },
          });
          if (!sentence) {
            sentence = this.sentenceEntityRepository.create({ text });
            sentence = await this.sentenceEntityRepository.save(sentence);
          }
          return sentence;
        }),
      );
    }

    const word = await this.wordsEntityRepository.create({
      ...createWordDto,
      sentences,
      partOfSpeech: partOfSpeech,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.wordsEntityRepository.save(word);
  }

  async update(wordId: string, updateWordDto: UpdateWordDto) {}

  async get(en: string) {
    return await this.wordsEntityRepository.findOne({ where: { en } });
  }

  async getAll() {
    return await this.wordsEntityRepository.find({});
  }

  async deleteByEn(en: string) {
    return await this.wordsEntityRepository.delete({ en });
  }
}
