import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, ValidateNested } from 'class-validator';

export class UserReplyDto {
  @IsInt({ message: 'Deve ser um numero' })
  questionId: number;

  @IsInt({ message: 'Deve ser um numero' })
  replyId: number;
}

export class RegisterUserRepliesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UserReplyDto)
  quizReply: UserReplyDto[];
}
