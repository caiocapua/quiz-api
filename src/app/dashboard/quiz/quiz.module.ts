import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizController } from './quiz.controller';
import { InitializeQuizService } from './service/initializeQuiz.service';
import { FinalizeQuizService } from './service/finalizeQuiz.service';
import { GetResultQuizService } from './service/getResultQuiz.service';
import { UserRepliesRepository } from 'src/repositories/userReplies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, UserRepliesRepository])],
  providers: [InitializeQuizService, FinalizeQuizService, GetResultQuizService],
  controllers: [QuizController],
  exports: [FinalizeQuizService],
})
export class QuizModule {}
