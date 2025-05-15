import { AbstractEntity } from 'src/database/abstract.enitity';
import { LessonEntity } from 'src/lessons/entities/lesson.entity';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';
import { TextEnitity } from 'src/texts/entities/text.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'phrases' })
export class PhrasesEntity extends AbstractEntity<PhrasesEntity> {
  @Column({ unique: true })
  en: string;

  @Column({ type: 'text', array: true })
  translate: string[];

  @ManyToMany(() => SentenceEntity, { cascade: true })
  @JoinTable()
  sentences: SentenceEntity[];

  @ManyToOne(() => LessonEntity, (lesson) => lesson.phrases, {
    nullable: true,
  })
  lesson: LessonEntity | null;

  @ManyToMany(() => TextEnitity, (text) => text.phrases, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  texts: TextEnitity[];
}
