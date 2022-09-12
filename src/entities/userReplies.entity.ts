import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { User } from './user.entity';

@Entity('tb_user_replies')
export class UserReplies {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'question_id' })
  questionId: number;

  @Column({ name: 'quiz_id' })
  quizId: string;

  @Column({ name: 'reply_id' })
  replyId: number;

  @Column({ name: 'is_correct' })
  isCorrect: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.userReplies)
  @JoinColumn({ name: 'quiz_id', referencedColumnName: 'id' })
  quiz: Quiz;

  @Column({ name: 'user_id' })
  userId: string;
}
