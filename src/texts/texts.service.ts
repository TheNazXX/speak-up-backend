import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TextEnitity } from './entities/text.entity';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';

@Injectable()
export class TextsService {
  constructor(
    @InjectRepository(TextEnitity) private textEntity: Repository<TextEnitity>,
    private readonly enitiyManager: EntityManager,
  ) {}

  async create(createTextDto: CreateTextDto) {
    const data = await this.textEntity.create(createTextDto);

    return await this.enitiyManager.save(data);
  }

  async update(id: string, updateTextDto: UpdateTextDto) {
    const text = await this.textEntity.findOne({ where: { id } });
    if (!text) {
      throw new NotFoundException('Text not found');
    }

    if (updateTextDto.title !== undefined) {
      if (updateTextDto.title !== text.title) {
        const exists = await this.textEntity.findOne({
          where: { title: updateTextDto.title },
        });
        if (exists) {
          throw new ConflictException('Text with this title already exists');
        }
      }
      text.title = updateTextDto.title;
    }

    if (updateTextDto.content !== undefined) {
      text.content = updateTextDto.content;
    }

    return this.textEntity.save(text);
  }

  async getByTitle(title: string) {
    return await this.textEntity.find({
      where: {
        title,
      },
    });
  }

  async getAll() {
    return await this.textEntity.find();
  }

  async getByName(name: string) {}
}
