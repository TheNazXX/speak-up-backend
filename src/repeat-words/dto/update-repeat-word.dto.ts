import { PartialType } from '@nestjs/swagger';
import { CreateRepeatWordDto } from './create-repeat-word.dto';

export class UpdateRepeatWordDto extends PartialType(CreateRepeatWordDto) {}
