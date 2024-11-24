import { Exclude, Expose } from 'class-transformer';

export class BaseGetDto {
  @Exclude()
  __v: string;

  @Expose({ name: '_id' })
  id: string;
}
