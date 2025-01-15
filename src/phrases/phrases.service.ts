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
    return await this.phraseEntityRepository.find({});
  }

  async findByEn(en: string) {
    return await this.phraseEntityRepository.findOne({
      where: { en },
      relations: { sentences: true },
    });
  }

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

  async update(id: number, updatePhraseDto: UpdatePhraseDto) {
    return `This action updates a #${id} phrase`;
  }

  async remove(id: number) {
    return `This action removes a #${id} phrase`;
  }
}
