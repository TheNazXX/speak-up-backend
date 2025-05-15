import { AbstractEntity } from 'src/database/abstract.enitity';
import { BaseDate } from 'src/entities/root';
import { LessonEntity } from 'src/lessons/entities/lesson.entity';
import { WordsEntity } from 'src/words/entities/word.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sentence' })
export class SentenceEntity extends AbstractEntity<SentenceEntity> {
  @Column()
  text: string;

  @ManyToOne(() => LessonEntity, (lesson) => lesson.sentences, {
    nullable: true,
  })
  lesson: LessonEntity | null;
}
