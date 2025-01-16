import { Injectable } from '@nestjs/common';
import { CreateRepeatPhraseDto } from './dto/create-repeat-phrase.dto';
import { UpdateRepeatPhraseDto } from './dto/update-repeat-phrase.dto';

@Injectable()
export class RepeatPhrasesService {
  create(createRepeatPhraseDto: CreateRepeatPhraseDto) {
    return 'This action adds a new repeatPhrase';
  }

  findAll() {
    return `This action returns all repeatPhrases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repeatPhrase`;
  }

  update(id: number, updateRepeatPhraseDto: UpdateRepeatPhraseDto) {
    return `This action updates a #${id} repeatPhrase`;
  }

  remove(id: number) {
    return `This action removes a #${id} repeatPhrase`;
  }
}
