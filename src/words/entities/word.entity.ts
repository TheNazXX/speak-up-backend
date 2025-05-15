import { PartsOfSpeechEntity } from 'src/entities/partOfSpeech.entity';
import { BaseDate } from 'src/entities/root';
import { LessonEntity } from 'src/lessons/entities/lesson.entity';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';
import { TextEnitity } from 'src/texts/entities/text.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'words' })
export class WordsEntity extends BaseDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  en: string;

  @Column({ type: 'text', array: true })
  translate: string[];

  @ManyToOne(() => PartsOfSpeechEntity, (part) => part.name)
  @JoinColumn({ name: 'part_of_speech' })
  partOfSpeech: PartsOfSpeechEntity;

  @ManyToMany(() => SentenceEntity, { cascade: true })
  @JoinTable()
  sentences: SentenceEntity[];

  @Column({ default: false })
  isOld: boolean;

  @ManyToOne(() => LessonEntity, (lesson) => lesson.words, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  lesson: LessonEntity | null;

  @ManyToMany(() => TextEnitity, (text) => text.words, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  texts: TextEnitity[];
}
