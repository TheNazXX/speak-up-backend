import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseDate } from 'src/entities/root';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateTextDto extends BaseDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the text' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The content of the text' })
  @IsString()
  content: string;
}
