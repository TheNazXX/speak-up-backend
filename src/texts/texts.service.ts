import { Injectable } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';

// import { UpdateTextDto } from './dto/update-text.dto';

@Injectable()
export class TextsService {
  constructor() {}

  async create({ data }: CreateTextDto) {}

  async createWithWords({ data, words }: CreateTextDto) {}

  async getAll() {}

  async getByName(name: string) {}
}
