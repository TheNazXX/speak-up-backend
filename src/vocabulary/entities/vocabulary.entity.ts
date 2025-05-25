import { PartsOfSpeechEntity } from 'src/entities/partOfSpeech.entity';
import { BaseDate } from 'src/entities/root';
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
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VocabularyType } from '../dto/create-vocabulary.dto';

@Entity({ name: 'vocabulary' })
export class VocabularyEntity extends BaseDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  en: string;

  @Column({ type: 'text', array: true })
  translate: string[];

  @ManyToOne(() => PartsOfSpeechEntity, (part) => part.name, { nullable: true })
  @JoinColumn({ name: 'part_of_speech' })
  partOfSpeech: PartsOfSpeechEntity;

  @ManyToMany(() => SentenceEntity, { cascade: true, nullable: true })
  @JoinTable()
  sentences: SentenceEntity[];

  @ManyToOne(() => LessonEntity, (lesson) => lesson.vocabulary, {
    nullable: true,
  })
  lesson: LessonEntity | null;

  @Column({ default: VocabularyType.WORD })
  type: VocabularyType;

  @Column({ default: false })
  isOld: boolean;

  @Column({ name: 'repeated_at' })
  repeatedAt: Date;
}
