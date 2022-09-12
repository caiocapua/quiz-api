import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('tb_answers')
export class Answers {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('character varying', { name: 'reply' })
  reply: string;

  @Column('boolean', { name: 'is_correct' })
  @Exclude()
  isCorrect: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: string | null;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;
}
