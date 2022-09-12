import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { UserReplies } from './userReplies.entity';

@Entity('tb_quiz')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fineshed_time', nullable: true })
  fineshedTime: number | null;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @Column({ name: 'amount_of_correct', nullable: true })
  amountOfCorrect: number;

  @Column({ name: 'amount_of_errors', nullable: true })
  amountOfErrors: number;

  @Column({ name: 'finalized_at', type: 'timestamp', nullable: true })
  finalizedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  @Exclude()
  deletedAt: string;

  @OneToMany(() => Category, (category) => category.quiz)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category[];

  @ManyToOne(() => User, (user) => user.quiz)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => UserReplies, (userReplies) => userReplies.quiz)
  userReplies: UserReplies[];
}
