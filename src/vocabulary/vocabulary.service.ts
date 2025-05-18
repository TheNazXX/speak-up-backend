import { Injectable } from '@nestjs/common';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VocabularyEntity } from './entities/vocabulary.entity';
import { PartsOfSpeechEntity } from 'src/entities/partOfSpeech.entity';
import { SentencesService } from 'src/sentences/sentences.service';

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

  async create(createVocabularyDto: CreateVocabularyDto) {}

  findAll() {
    return this.vocabularyEntityRepository.find({
      relations: { sentences: true },
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
