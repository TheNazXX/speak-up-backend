import { ConflictException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { RepeatWords } from 'src/schemas/RepeatWords.chema';
import { Word } from 'src/schemas/Word.schema';

@Injectable()
export class RepeatWordsService {
  constructor(
    @InjectModel(Word.name)
    private wordModel: Model<Word>,
    @InjectModel(RepeatWords.name)
    private repeatWordsModel: Model<RepeatWords>,
  ) {}

  public async getAll() {
    return await this.repeatWordsModel.find().populate('wordId').lean();
  }

  public async getRandomWords(count = 5) {
    const existingRepeatWord = await this.repeatWordsModel.findOne().exec();

    if (existingRepeatWord) {
      throw new ConflictException('Words already exists!');
    }

    const randomWords = await this.wordModel.aggregate([
      { $sample: { size: Number(count) } },
    ]);

    const repeatWordsDocs = randomWords.map((item: Word & Document) => {
      return {
        wordId: item._id,
      };
    });

    await this.repeatWordsModel.insertMany(repeatWordsDocs);

    return randomWords;
  }

  public async deleteAll() {
    await this.repeatWordsModel.deleteMany({});
  }
}
