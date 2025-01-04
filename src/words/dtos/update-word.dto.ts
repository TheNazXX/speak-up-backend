import { ArrayNotEmpty, IsArray, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSentenceDto } from './create-sentence-dto';

export class UpdateWordDto {
  @IsOptional()
  @IsString()
  en: string;

  @IsOptional()
  @IsString()
  translate: string;
}
