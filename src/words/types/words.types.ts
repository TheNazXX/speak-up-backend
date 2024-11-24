import { IBase } from 'src/types/root.types';

export interface IWord extends IBase {
  en: string;
  translate: string[];
}
