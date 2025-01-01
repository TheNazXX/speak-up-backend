import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseDate {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
