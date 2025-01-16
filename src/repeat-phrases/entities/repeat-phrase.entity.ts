import { PhrasesEntity } from 'src/phrases/entities/phrase.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity('repeat_phrases')
export class RepeatPhraseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  en: string;

  @OneToOne(() => PhrasesEntity, (phrase) => phrase.en)
  @JoinColumn({ name: 'phrase' })
  phrase: PhrasesEntity;
}
