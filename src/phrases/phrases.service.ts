import { Inject, Injectable } from '@nestjs/common';
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

  update(id: number, updatePhraseDto: UpdatePhraseDto) {
    return `This action updates a #${id} phrase`;
  }

  remove(id: number) {
    return `This action removes a #${id} phrase`;
  }
}
