import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsRepository } from 'src/repositories/questions.repository';
import { UserRepliesRepository } from 'src/repositories/userReplies.repository';
import { ResultQuestion } from '../dtos/ResultQuestion.dto';
import { UserReplyDto } from '../dtos/UserReplies.dto';

@Injectable()
export class GetResultQuestionService {
  constructor(
    @InjectRepository(QuestionsRepository)
    private readonly _questionsRepository: QuestionsRepository,
    @InjectRepository(UserRepliesRepository)
    private readonly _userRepliesRepository: UserRepliesRepository,
  ) {}

  async execute(
    userId: string,
    userReply: UserReplyDto[],
    quizId: string,
  ): Promise<ResultQuestion> {
    if (userReply.length === 0)
      throw new BadRequestException([
        { property: 'replyId', error: 'É necessário responder a questão.' },
      ]);

    const question = await this._questionsRepository.getQuestionById(
      userReply[0].questionId,
      userReply[0].replyId,
    );

    if (!question)
      throw new NotFoundException([
        {
          property: 'replyId',
          error: 'É necessário enviar uma resposta valida.',
        },
      ]);

    const userReplies = this._userRepliesRepository.create({
      userId,
      questionId: userReply[0].questionId,
      replyId: userReply[0].replyId,
      quizId,
      isCorrect: question.answers[0].isCorrect,
    });

    this._userRepliesRepository.save(userReplies);

    return { isCorrect: question.answers[0].isCorrect };
  }
}
