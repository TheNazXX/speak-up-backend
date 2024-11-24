import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWordDto {
  @ApiProperty({ description: 'word' })
  @IsString()
  en: string;

  @ApiProperty({ description: 'Word translate' })
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  translate: string[];
}

export class UpdateWordDto extends CreateWordDto {}
