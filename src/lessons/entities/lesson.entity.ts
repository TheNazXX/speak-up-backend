import { AbstractEntity } from 'src/database/abstract.enitity';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';
import { VocabularyEntity } from 'src/vocabulary/entities/vocabulary.entity';

import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

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

  @OneToMany(() => VocabularyEntity, (vocabulary) => vocabulary.lesson, {
    nullable: true,
  })
  vocabulary: VocabularyEntity[];
}
