import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answers } from './answers.entity';
import { Category } from './category.entity';

@Entity('tb_questions')
export class Question {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('character varying', { name: 'question_name', length: 255 })
  questionName: string;

  @Column('int', { name: 'points' })
  points: number;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: string | null;

  @ManyToOne(() => Category, (category) => category.categoryName)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Answers, (answer) => answer.question)
  answers: Answers[];
}
