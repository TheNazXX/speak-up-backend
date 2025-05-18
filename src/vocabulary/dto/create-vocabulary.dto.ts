export const enum VocabularyType {
  WORD = 'word',
  PHRASE = 'phrase',
}

export class CreateVocabularyDto {
  en: string;
  translate: string[];
  partOfSpeechId: string;
  sentencesId: string[] | null;
  lessonId: string | null;
  textsId: string[] | null;
  isOld: boolean;
  type: VocabularyType;
}
