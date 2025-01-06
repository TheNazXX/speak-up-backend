import { AbstractEntity } from 'src/database/abstract.enitity';
import { SentenceEntity } from 'src/sentences/entities/sentence.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'phrases' })
export class PhrasesEntity extends AbstractEntity<PhrasesEntity> {
  @Column({ unique: true })
  en: string;

  @Column({ type: 'text', array: true })
  translate: string[];

  @ManyToMany(() => SentenceEntity, { cascade: true })
  @JoinTable()
  sentences: SentenceEntity[];
}
