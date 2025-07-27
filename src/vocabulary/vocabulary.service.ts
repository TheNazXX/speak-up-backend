import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateVocabularyDto,
  VocabularyType,
} from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VocabularyEntity } from './entities/vocabulary.entity';
import { PartsOfSpeechEntity } from 'src/entities/partOfSpeech.entity';
import { SentencesService } from 'src/sentences/sentences.service';
import { RequestVocabularyType } from './interface';

@Injectable()
export class VocabularyService {
  constructor(
    @InjectRepository(VocabularyEntity)
    private vocabularyEntityRepository: Repository<VocabularyEntity>,

    @InjectRepository(PartsOfSpeechEntity)
    private partOfSpeechEntityRepository: Repository<PartsOfSpeechEntity>,

    private readonly entityManager: EntityManager,
    private readonly sentencesService: SentencesService,
  ) {}

  async create(createVocabularyDto: CreateVocabularyDto) {
    const isExists = await this.vocabularyEntityRepository.findOne({
      where: { en: createVocabularyDto.en },
    });

    if (isExists) {
      throw new ConflictException('Such vocabluraly already created');
    }

    const partOfSpeech = await this.partOfSpeechEntityRepository.findOne({
      where: { name: createVocabularyDto.partOfSpeech }});

    const data = this.vocabularyEntityRepository.create({
      ...createVocabularyDto,
      en: createVocabularyDto.en.trim(),
      translate: createVocabularyDto.translate.map((item) => item.trim()),
      createdAt: new Date(),
      updatedAt: new Date(),
      isStudied: false,
      sentences: [],
      isDifficult: false,
      repeatedAt: new Date(),
      partOfSpeech: partOfSpeech

    });

    return this.entityManager.save(data);
  }

  async getAll(filters: {
    type?: RequestVocabularyType;
    createdAt?: string;
    repeatedAt?: string;
  }) {
    const NORMILIZE_TYPE =
      filters.type === RequestVocabularyType.PHRASES
        ? VocabularyType.PHRASE
        : VocabularyType.WORD;

    const query =
      this.vocabularyEntityRepository.createQueryBuilder('vocabulary');

    if (filters.type) {
      query.andWhere('vocabulary.type = :type', { type: NORMILIZE_TYPE });
    }

    if (filters.createdAt) {
      query.andWhere(`DATE(vocabulary.createdAt) = :createdAt`, {
        createdAt: filters.createdAt,
      });
    }

    if (filters.repeatedAt) {
      query.andWhere(`DATE(vocabulary.repeatedAt) = :repeatedAt`, {
        repeatedAt: filters.repeatedAt,
      });
    }

    return query.getMany();
  }

  async getAllDatesByType(
    dateColumn: 'createdAt' | 'repeatedAt',
    type?: RequestVocabularyType,
  ): Promise<string[]> {
    const NORMILIZE_TYPE =
      type === RequestVocabularyType.PHRASES
        ? VocabularyType.PHRASE
        : VocabularyType.WORD;

    const query = this.vocabularyEntityRepository
      .createQueryBuilder('vocabulary')
      .select(`TO_CHAR(vocabulary.${dateColumn}, 'YYYY-MM-DD')`, 'date')
      .distinct(true)
      .orderBy('date', 'DESC');

    if (type) {
      query.where('vocabulary.type = :type', { type: NORMILIZE_TYPE });
    }

    const data = await query.getRawMany();
    return data.map((item) => item.date);
  }

  async getByEn(en: string) {
    const data = await this.vocabularyEntityRepository.findOne({
      where: { en },
      relations: ['partOfSpeech', 'sentences'],
    })
  
    if(!data) {
      throw new NotFoundException(`Vocabulary with en "${en}" not found`)
    }

    return data
  }

  async update(en: string, updateVocabularyDto: UpdateVocabularyDto) {
    const vocabulary = await this.vocabularyEntityRepository.findOne({
      where: { en },
      relations: ['partOfSpeech'] 
    });

    if (!vocabulary) {
      throw new NotFoundException(`Vocabulary ${en} not found`);
    }


    if (updateVocabularyDto.en && updateVocabularyDto.en !== vocabulary.en) {
      const isExists = await this.vocabularyEntityRepository.findOne({
        where: { en: updateVocabularyDto.en },
      });

      if (isExists) {
        throw new ConflictException('Vocabulary with this English term already exists');
      }
    }

    let partOfSpeech = vocabulary.partOfSpeech;

    if (updateVocabularyDto.partOfSpeech) {
      partOfSpeech = await this.partOfSpeechEntityRepository.findOne({
        where: { name: updateVocabularyDto.partOfSpeech }
      });
    }

    const updatedVocabulary = this.vocabularyEntityRepository.merge(vocabulary, {
      ...updateVocabularyDto,
      sentences: [],
      updatedAt: new Date(),
      partOfSpeech: partOfSpeech
    });

    return this.entityManager.save(updatedVocabulary);
  }

  async updateRepeating(vocabularyItems: CreateVocabularyDto[]) {
    const updatedItems = await Promise.all(
       vocabularyItems.map(async (item) => {
        const vocabulary = await this.vocabularyEntityRepository.findOne({
          where: { en: item.en },
        });

        if (!vocabulary) {
          throw new NotFoundException(`Vocabulary with en "${item.en}" not found`);
        }

        vocabulary.repeatedAt = new Date();

        return this.entityManager.save(vocabulary);
      }),
    );

    return updatedItems;
  }


  remove(id: number) {
    return `This action removes a #${id} vocabulary`;
  }
}
