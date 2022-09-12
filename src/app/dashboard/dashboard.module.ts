import { Module } from '@nestjs/common';
import { AnswersModule } from './answers/answers.module';
import { CategoriesModule } from './categories/categories.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [QuizModule, CategoriesModule, AnswersModule],
})
export class DashboardModule {}
