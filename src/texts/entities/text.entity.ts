import { BaseDate } from 'src/entities/root';
import { PhrasesEntity } from 'src/phrases/entities/phrase.entity';
import { WordsEntity } from 'src/words/entities/word.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'texts' })
export class TextEnitity extends BaseDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  content: string;

  @ManyToMany(() => WordsEntity, (word) => word.texts, { cascade: true })
  @JoinTable({
    name: 'texts_words',
    joinColumn: {
      name: 'text_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'word_id',
      referencedColumnName: 'id',
    },
  })
  words: WordsEntity[];

  @ManyToMany(() => PhrasesEntity, (phrase) => phrase.texts, { cascade: true })
  @JoinTable({
    name: 'texts_phrases',
    joinColumn: {
      name: 'text_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'phrase_id',
      referencedColumnName: 'id',
    },
  })
  phrases: PhrasesEntity[];
}
