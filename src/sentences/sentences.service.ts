import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';

@Injectable()
export class SentencesService {
  constructor(
    @InjectRepository(SentenceEntity)
    private sentenceEntityRepository: Repository<SentenceEntity>,

    private readonly enitiyManager: EntityManager,
  ) {}

  async getAll() {
    return;
  }

  async getByVocabulary(vocabulary: string) {}

  async update(id: string, text: string) {
    const senteceData = await this.sentenceEntityRepository.findOneBy({ id });

    if (!senteceData) {
      throw new NotFoundException("Can't find the sentence!");
    }

    senteceData.updatedAt = new Date();
    senteceData.text = text;

    return this.enitiyManager.save(senteceData);
  }

  async delete(id: string) {
    const sentence = await this.sentenceEntityRepository.findOneBy({ id });

    if (!sentence) {
      throw new NotFoundException(`Sentence not found.`);
    }

    const deletedSentece = { ...sentence };

    await this.sentenceEntityRepository.remove(sentence);

    return deletedSentece;
  }
}
