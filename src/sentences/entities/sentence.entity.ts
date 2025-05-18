import { AbstractEntity } from 'src/database/abstract.enitity';
import { LessonEntity } from 'src/lessons/entities/lesson.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'sentence' })
export class SentenceEntity extends AbstractEntity<SentenceEntity> {
  @Column()
  text: string;

  @ManyToOne(() => LessonEntity, (lesson) => lesson.sentences, {
    nullable: true,
  })
  lesson: LessonEntity | null;
}
