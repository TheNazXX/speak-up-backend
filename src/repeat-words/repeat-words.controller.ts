import { Controller, Get, Delete, Param } from '@nestjs/common';
import { RepeatWordsService } from './repeat-words.service';
import { plainToInstance } from 'class-transformer';
import { WordDto } from 'src/words/dtos/get-words-dto';

@Controller('repeat-words')
export class RepeatWordsController {
  constructor(private readonly repeatWordsService: RepeatWordsService) {}

  @Get('/random/:count')
  async getRandomWords(@Param('count') count: number = 5) {
    const data = await this.repeatWordsService.getRandomWords(count);

    return {
      status: 200,
      data,
      message: 'Data was successfully found',
    };
  }

  @Get()
  async getAllWords() {
    const data = plainToInstance(
      WordDto,
      (await this.repeatWordsService.getAll()).map((item) => {
        return {
          ...item.wordId,
        };
      }),
    );

    return {
      status: 200,
      data,
      message: 'Data was successfully found',
    };
  }

  @Delete('/all')
  async deleteAll() {
    return this.repeatWordsService.deleteAll();
  }
}
