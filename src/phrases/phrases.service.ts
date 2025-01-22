import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { PhrasesEntity } from './entities/phrase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';

@Injectable()
export class PhrasesService {
  constructor(
    @InjectRepository(PhrasesEntity)
    private readonly phraseEntityRepository: Repository<PhrasesEntity>,

    @InjectRepository(SentenceEntity)
    private readonly sentenceEnitityRepository: Repository<SentenceEntity>,

    private readonly entityManager: EntityManager,
  ) {}

  async create(createPhraseDto: CreatePhraseDto) {
    const sentences = createPhraseDto.sentences.map(
      (item) =>
        new SentenceEntity({
          text: item,
        }),
    );

    const phraseData = await this.phraseEntityRepository.create({
      ...createPhraseDto,
      en: createPhraseDto.en.trim(),
      sentences,
    });

    return await this.entityManager.save(phraseData);
  }

  async findAll() {
    return await this.phraseEntityRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByEn(en: string) {
    return await this.phraseEntityRepository.findOne({
      where: { en },
      relations: { sentences: true },
    });
  }

  async findById(id: string) {
    return await this.phraseEntityRepository.findOne({
      where: { id },
      relations: { sentences: true },
    });
  }
  v;

  async addSentence(en: string, sentence: string) {
    const phraseData = await this.phraseEntityRepository.findOne({
      where: { en },
      relations: { sentences: true },
    });

    if (!phraseData) {
      throw new NotFoundException('Not found phrase');
    }

    phraseData.sentences = [
      ...(phraseData?.sentences || []),
      new SentenceEntity({ text: sentence }),
    ];

    return await this.entityManager.save(phraseData);
  }

  async getLastAddedPhrases() {
    let data = [];
    let i = 1;

    while (!!!data.length) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - i);

      data = await this.phraseEntityRepository
        .createQueryBuilder('phrase')
        .where('phrase.createdAt >= :yesterday', { yesterday })
        .andWhere('phrase.createdAt < :today', { today })
        .getMany();

      i++;
    }

    return data;
  }

  async deleteByEn(en: string) {
    return await this.phraseEntityRepository.delete({ en });
  }
}
