import { Injectable } from '@nestjs/common';
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
    const allWords = await this.vocabularyEntityRepository.find({
      where: {
        type: VocabularyType.WORD,
      },
    });

    const now = new Date();

    const updatedWords = allWords.map((word, index) => {
      const daysBack = Math.floor(index / 10);
      const newDate = new Date(now);
      newDate.setDate(now.getDate() - daysBack);

      word.createdAt = newDate;
      word.updatedAt = newDate;

      return word;
    });

    return this.entityManager.save(updatedWords);
  }

  async getAll(type?: RequestVocabularyType) {
    const NORMILIZE_TYPE =
      type === RequestVocabularyType.PHRASES
        ? VocabularyType.PHRASE
        : VocabularyType.WORD;

    return this.vocabularyEntityRepository.find({
      where: {
        type: NORMILIZE_TYPE,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} vocabulary`;
  }

  update(id: number, updateVocabularyDto: UpdateVocabularyDto) {
    return `This action updates a #${id} vocabulary`;
  }

  remove(id: number) {
    return `This action removes a #${id} vocabulary`;
  }
}
