export const enum VocabularyType {
  WORD = 'word',
  PHRASE = 'phrase',
}

export class CreateVocabularyDto {
  en: string;
  translate: string[];
  partOfSpeech: string | null;
  sentences: string[] | null;
  lessonId: string | null;
  type: VocabularyType;
}
