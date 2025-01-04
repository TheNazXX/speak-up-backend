import { AbstractEntity } from 'src/database/abstract.enitity';
import { BaseDate } from 'src/entities/root';
import { WordsEntity } from 'src/words/entities/word.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sentence' })
export class SentenceEntity extends AbstractEntity<SentenceEntity> {
  @Column()
  text: string;
}
