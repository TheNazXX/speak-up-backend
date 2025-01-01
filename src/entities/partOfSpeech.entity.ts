import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'parts_of_speech' })
export class PartsOfSpeechEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
