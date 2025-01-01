import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TextsService } from './texts.service';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { plainToInstance } from 'class-transformer';
import { TextDto } from './dto/get-text.dto';

@Controller('texts')
export class TextsController {
  constructor(private readonly textsService: TextsService) {}

  @Post()
  create(@Body() createTextDto: CreateTextDto) {
    return this.textsService.createWithWords(createTextDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async getAll() {
    const data = plainToInstance(TextDto, await this.textsService.getAll());
    return {
      message: 'Texts found successfully',
      data,
      status: 200,
    };
  }

  @Get('/:name')
  async getByName(@Param('name') name: string) {
    const data = plainToInstance(
      TextDto,
      await this.textsService.getByName(name),
    );

    return {
      message: 'Text found successfully',
      data,
      status: 200,
    };
  }
}
