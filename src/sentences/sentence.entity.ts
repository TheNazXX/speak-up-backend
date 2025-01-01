import { BaseDate } from 'src/entities/root';
import { WordsEntity } from 'src/words/entities/word.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sentence' })
export class SentenceEntity extends BaseDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToMany(() => WordsEntity, (word) => word.sentences)
  @JoinTable({
    name: 'sentence_words',
    joinColumn: { name: 'sentence_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'word_id', referencedColumnName: 'id' },
  })
  words: WordsEntity[];
}
