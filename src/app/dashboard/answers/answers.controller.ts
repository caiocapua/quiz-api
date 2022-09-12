import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RegisterUserRepliesDto } from './dtos/UserReplies.dto';
import { GetResultQuestionService } from './services/getResultQuestion.service';

@Controller('answers')
@UseGuards(JwtAuthGuard)
export class AnswersController {
  constructor(private readonly _getResultQuestion: GetResultQuestionService) {}

  @Post(':userId/:quizId')
  async getResultQuestion(
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
    @Body() userReply: RegisterUserRepliesDto,
  ) {
    return this._getResultQuestion.execute(userId, userReply.quizReply, quizId);
  }
}
