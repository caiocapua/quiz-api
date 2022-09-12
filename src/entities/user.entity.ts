import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity('tb_users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'accept_terms' })
  acceptTerms: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, default: '' })
  @Exclude()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  @Exclude()
  deletedAt: string;

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  quiz: Quiz[];
}
