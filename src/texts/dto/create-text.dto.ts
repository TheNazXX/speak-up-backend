import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { IWord } from 'src/words/types/words.types';

import { Type } from 'class-transformer';

export class TextDto {
  @ApiProperty({ description: 'The name of the text' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The content of the text' })
  @IsString()
  content: string;
}

export class CreateTextDto {
  @ApiProperty({ description: 'Text object containing name and content' })
  @ValidateNested() // Валидация вложенного объекта
  @Type(() => TextDto) // Трансформация вложенного объекта
  data: TextDto;

  words: IWord[];
}
