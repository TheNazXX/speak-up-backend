import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('global_settings')
export class GlobalSettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lastRepeatingWordsDate: Date;
}
