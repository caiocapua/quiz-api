import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { QuestionsRepository } from 'src/repositories/questions.repository';
import { UserRepliesRepository } from 'src/repositories/userReplies.repository';
import { FinalizeQuizService } from '../quiz/service/finalizeQuiz.service';
import { AnswersController } from './answers.controller';
import { GetResultQuestionService } from './services/getResultQuestion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionsRepository,
      UserRepliesRepository,
      Quiz,
    ]),
  ],
  providers: [GetResultQuestionService, FinalizeQuizService],
  controllers: [AnswersController],
})
export class AnswersModule {}
