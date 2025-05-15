import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { IWord } from 'src/words/types/words.types';

import { Type } from 'class-transformer';

export interface AccordingTextWords {
  en: string;
  translate: string[];
  type: 'word' | 'phrase';
}

export class CreateTextDto<T> {
  @ApiProperty({ description: 'The name of the text' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The content of the text' })
  @IsString()
  content: string;

  enities: T | null;
}
