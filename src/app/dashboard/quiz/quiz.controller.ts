import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { FinalizeQuizService } from './service/finalizeQuiz.service';
import { GetResultQuizService } from './service/getResultQuiz.service';
import { InitializeQuizService } from './service/initializeQuiz.service';

@Controller('quiz')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(
    private readonly _initializeQuizService: InitializeQuizService,
    private readonly _finalizeQuizService: FinalizeQuizService,
    private readonly _getResultQuizService: GetResultQuizService,
  ) {}

  @Get(':userId/:quizId')
  async getResultQuiz(
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
  ) {
    return this._getResultQuizService.execute(userId, quizId);
  }

  @Get('initialize/:userId/:categoryId')
  async initializeQuiz(
    @Param('userId') userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this._initializeQuizService.execute(userId, categoryId);
  }

  @Patch(':quizId')
  async finalizeQuiz(@Param('quizId') quizId: string) {
    return this._finalizeQuizService.execute(quizId);
  }
}
