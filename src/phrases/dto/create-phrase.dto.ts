import { IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreatePhraseDto {
  @IsString()
  en: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  translate: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sentences: string[];
}
