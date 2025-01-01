import { Injectable } from '@nestjs/common';

import { IWord } from 'src/words/types/words.types';

@Injectable()
export class RepeatWordsService {
  constructor() {}

  public async getAll() {}

  public async getRandomWords(count = 5) {}

  public async postIncorrectWords(incorrectWords: IWord[]) {}

  public async deleteAll() {}
}
