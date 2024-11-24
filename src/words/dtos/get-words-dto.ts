import { Exclude, Expose } from 'class-transformer';

export class WordDto {
  @Exclude()
  __v: string;

  @Expose({ name: '_id' })
  id: string;
}
