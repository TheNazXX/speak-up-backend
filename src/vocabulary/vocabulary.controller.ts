import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { RequestVocabularyType } from './interface';

@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post()
  async create(@Body() createVocabularyDto: CreateVocabularyDto) {
    const data = await this.vocabularyService.create(createVocabularyDto);
    return {
      status: 201,
      data,
      message: 'Word successfully created',
    };
  }

  @Get()
  findAll(
    @Query('type') type?: RequestVocabularyType,
    @Query('createdAt') createdAt?: string,
    @Query('repeatedAt') repeatedAt?: string,
  ) {
    return this.vocabularyService.getAll({ type, createdAt, repeatedAt });
  }

  @Get('/created-dates')
  async getAllCreatedDates(@Query('type') type?: RequestVocabularyType) {
    const data = await this.vocabularyService.getAllDatesByType(
      'createdAt',
      type,
    );
    return {
      status: 200,
      data,
      message: 'Dates successfully found',
    };
  }

  @Get('/repeated-dates')
  async getAllRepeatedDates(@Query('type') type?: RequestVocabularyType) {
    const data = await this.vocabularyService.getAllDatesByType(
      'repeatedAt',
      type,
    );
    return {
      status: 200,
      data,
      message: 'Dates successfully found',
    };
  }

  @Patch('/repeating')
  async updateRepeating(
    @Body() vocabularyItems: CreateVocabularyDto[],
  ) {
    const data = await this.vocabularyService.updateRepeating(vocabularyItems); 
    return {
      status: 200,
      data,
      message: 'Vocabulary successfully repeated',
    };
  }

  @Get(':en')
    async findOne(@Param('en') en: string) {
      return this.vocabularyService.getByEn(en);
    }


  @Patch(':en')
  async update(
    @Param('en') en: string,
    @Body() updateVocabularyDto: UpdateVocabularyDto,
  ) {
    const data = await this.vocabularyService.update(en, updateVocabularyDto); 
    return {
      status: 200,
      data,
      message: 'Vocabulary successfully updated',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocabularyService.remove(+id);
  }
}
