import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto, UpdateWordDto } from './dtos/create-word-dto';
import { plainToInstance } from 'class-transformer';
import { WordDto } from './dtos/get-words-dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new word' })
  @ApiResponse({ status: 201, description: 'Word successfully created' })
  @ApiResponse({ status: 409, description: 'Element already exists' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateWordDto })
  @UsePipes(new ValidationPipe())
  async createWord(@Body() createWordDto: CreateWordDto) {
    const data = plainToInstance(
      WordDto,
      await this.wordsService.create(createWordDto),
    );

    return {
      status: 201,
      data,
      message: 'Word successfully created',
    };
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update word' })
  @ApiResponse({ status: 20, description: 'Word successfully updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: UpdateWordDto })
  @UsePipes(new ValidationPipe())
  async updateWord(
    @Body() updateWordDto: UpdateWordDto,
    @Param('id') wordId: string,
  ) {
    const data = plainToInstance(
      WordDto,
      await this.wordsService.update(wordId, updateWordDto),
    );

    return {
      status: 200,
      data,
      message: 'Data was succesfully update',
    };
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async getWords() {
    const data = plainToInstance(WordDto, await this.wordsService.getAll());

    return {
      status: 200,
      data,
      message: 'Data was succesfully found',
    };
  }

  @Get('/:en')
  @UsePipes(new ValidationPipe())
  async getWord(@Param('en') en: string) {
    const data = plainToInstance(WordDto, await this.wordsService.get(en));

    return {
      status: 200,
      data,
      message: 'Word was succesfully found',
    };
  }

  @Delete('/:en')
  async deleteWord(@Param('en') en: string) {
    const data = plainToInstance(
      WordDto,
      await this.wordsService.deleteByEn(en),
    );

    return {
      status: 200,
      data,
      message: 'Word was succesfully deleted',
    };
  }
}
