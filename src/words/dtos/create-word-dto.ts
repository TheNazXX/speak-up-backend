import { ArrayNotEmpty, IsArray, IsString, IsOptional } from 'class-validator';
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

  @IsString()
  partOfSpeech: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sentences: string[];
}

export class UpdateWordDto extends CreateWordDto {}
