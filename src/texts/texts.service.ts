import { Injectable } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { WordsEntity } from 'src/words/entities/word.entity';
import { PhrasesEntity } from 'src/phrases/entities/phrase.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TextEnitity } from './entities/text.entity';

// import { UpdateTextDto } from './dto/update-text.dto';

@Injectable()
export class TextsService {
  constructor(
    @InjectRepository(TextEnitity) private textEntity: Repository<TextEnitity>,
    private readonly enitiyManager: EntityManager,
  ) {}

  async create({
    name,
    content,
    enities: { words, phrases },
  }: CreateTextDto<{
    words: WordsEntity[] | null;
    phrases: PhrasesEntity[] | null;
  }>) {
    const data = this.textEntity.create({
      name,
      content,
      words,
      phrases,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.enitiyManager.save(data);
  }

  async getAll() {}

  async getByName(name: string) {}
}
