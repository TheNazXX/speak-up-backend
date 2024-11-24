import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word } from 'src/schemas/Word.schema';
import { CreateWordDto, UpdateWordDto } from './dtos/create-word-dto';

@Injectable()
export class WordsService {
  constructor(@InjectModel(Word.name) private wordModel: Model<Word>) {}

  async create(createWordDto: CreateWordDto) {
    const wordFromDB = await this.wordModel.findOne({
      en: createWordDto.en,
    });

    if (wordFromDB) {
      throw new ConflictException('Word already exists!');
    }

    const word = await this.wordModel.create({
      ...createWordDto,
      createAt: new Date(),
      updateAt: new Date(),
    });

    return word.toObject();
  }

  async update(wordId: string, updateWordDto: UpdateWordDto): Promise<Word> {
    try {
      const word = await this.wordModel
        .findByIdAndUpdate(
          wordId,
          {
            ...updateWordDto,
            updateAt: new Date(),
          },
          { new: true, runValidators: true },
        )
        .lean();

      if (!word) {
        throw new NotFoundException(`Word with id ${wordId} not found`);
      }

      return word;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'A word with this "en" field already exists',
        );
      }
      throw error;
    }
  }
  async get(en: string) {
    const data = await this.wordModel
      .findOne({
        en,
      })
      .lean();

    if (!data) {
      throw new NotFoundException('Word not found');
    }

    return data;
  }

  async getAll() {
    return await this.wordModel.find().lean();
  }

  async deleteByEn(en: string) {
    return await this.wordModel.deleteOne({ en: en });
  }
}
