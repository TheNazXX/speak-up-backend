import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { Model } from 'mongoose';
import { Text } from 'src/schemas/Text.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Word } from 'src/schemas/Word.schema';

// import { UpdateTextDto } from './dto/update-text.dto';

@Injectable()
export class TextsService {
  constructor(
    @InjectModel(Text.name)
    private TextModel: Model<Text>,
    @InjectModel(Word.name)
    private WordModel: Model<Word>,
  ) {}

  async create({ data }: CreateTextDto) {
    const text = await this.TextModel.create({
      ...data,
      createAt: new Date(),
      updateAt: new Date(),
    });

    return text;
  }

  async createWithWords({ data, words }: CreateTextDto) {
    const existingWords = await this.WordModel.find({
      en: { $in: words.map((item) => item.en) },
    });

    const text = await this.TextModel.create({
      ...data,
      createAt: new Date(),
      updateAt: new Date(),
      words: existingWords.map((item) => item._id),
    });

    return text;
  }

  async getAll() {
    const data = await this.TextModel.find({}).lean();

    return data;
  }

  async getByName(name: string) {
    const data: any = await this.TextModel.findOne({ name: name })
      .lean()
      .populate('words')
      .exec();

    if (!data) {
      throw new NotFoundException('Text not found');
    }

    data.words = data.words.map((word) => {
      return {
        id: word._id.toString(),
        en: word.en,
        createAt: word.createAt,
        updateAt: word.updateAt,
        translate: word.translate,
      };
    });

    return data;
  }
}
