import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export interface TextVocabulary {
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
