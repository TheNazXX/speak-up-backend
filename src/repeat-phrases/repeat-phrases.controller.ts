import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepeatPhrasesService } from './repeat-phrases.service';
import { CreateRepeatPhraseDto } from './dto/create-repeat-phrase.dto';
import { UpdateRepeatPhraseDto } from './dto/update-repeat-phrase.dto';

@Controller('repeat-phrases')
export class RepeatPhrasesController {
  constructor(private readonly repeatPhrasesService: RepeatPhrasesService) {}

  @Post()
  create(@Body() createRepeatPhraseDto: CreateRepeatPhraseDto) {
    return this.repeatPhrasesService.create(createRepeatPhraseDto);
  }

  @Get()
  findAll() {
    return this.repeatPhrasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repeatPhrasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepeatPhraseDto: UpdateRepeatPhraseDto) {
    return this.repeatPhrasesService.update(+id, updateRepeatPhraseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repeatPhrasesService.remove(+id);
  }
}
