import { AbstractEntity } from 'src/database/abstract.enitity';
import { PhrasesEntity } from 'src/phrases/entities/phrase.entity';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';
import { WordsEntity } from 'src/words/entities/word.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('lesson')
export class LessonEntity extends AbstractEntity<LessonEntity> {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => SentenceEntity, (sentence) => sentence.lesson, {
    nullable: true,
  })
  sentences: SentenceEntity[];

  @OneToMany(() => PhrasesEntity, (phrase) => phrase.lesson, { nullable: true })
  phrases: PhrasesEntity[];

  @OneToMany(() => WordsEntity, (words) => words.lesson, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  words: WordsEntity[];
}
