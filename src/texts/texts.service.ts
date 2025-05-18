import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TextEnitity } from './entities/text.entity';

@Injectable()
export class TextsService {
  constructor(
    @InjectRepository(TextEnitity) private textEntity: Repository<TextEnitity>,
    private readonly enitiyManager: EntityManager,
  ) {}

  async create() {}

  async getAll() {}

  async getByName(name: string) {}
}
