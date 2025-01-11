import { WordsEntity } from 'src/words/entities/word.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('repeat_words')
export class RepeatWordsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => WordsEntity, (word) => word.en)
  @JoinColumn({ name: 'word' })
  word: WordsEntity;

  @Column()
  en: string;
}
