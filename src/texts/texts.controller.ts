import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TextsService } from './texts.service';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { plainToInstance } from 'class-transformer';
import { TextDto } from './dto/get-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';

@Controller('texts')
export class TextsController {
  constructor(private readonly textsService: TextsService) {}

  @Post()
  async create(@Body() createTextDto: CreateTextDto) {
    return this.textsService.create(createTextDto);
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

  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateTextDto: UpdateTextDto) {
    const data = await this.textsService.update(id, updateTextDto);
    return {
      message: 'Text update successfully',
      data,
      status: 200,
    };
  }

  @Get('/:title')
  async getByName(@Param('title') title: string) {
    const data = await this.textsService.getByTitle(title);

    return {
      message: 'Text found successfully',
      data,
      status: 200,
    };
  }
}
