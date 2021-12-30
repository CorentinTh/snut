import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Paste {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 5000 })
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
