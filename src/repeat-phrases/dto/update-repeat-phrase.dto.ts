import { PartialType } from '@nestjs/swagger';
import { CreateRepeatPhraseDto } from './create-repeat-phrase.dto';

export class UpdateRepeatPhraseDto extends PartialType(CreateRepeatPhraseDto) {}
