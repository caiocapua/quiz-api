import { IsNumber } from 'class-validator';

export class AllReplies {
  @IsNumber()
  countCorrectAnswers: number;

  @IsNumber()
  countIncorrectAnswers: number;

  @IsNumber()
  totalQuestions: number;
}
