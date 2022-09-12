import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Quiz } from './quiz.entity';

@Entity('tb_categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('character varying', { name: 'category_name', length: 100 })
  categoryName: string;

  @Column('character varying', { name: 'url_image', length: 255 })
  urlImage: string;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: string | null;

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[];

  @ManyToOne(() => Quiz, (quiz) => quiz.category)
  quiz: Quiz;
}
