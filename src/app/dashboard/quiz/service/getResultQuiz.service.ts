import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { UserRepliesRepository } from 'src/repositories/userReplies.repository';
import { Repository } from 'typeorm';
import { FinalizeQuizService } from './finalizeQuiz.service';

@Injectable()
export class GetResultQuizService {
  constructor(
    @InjectRepository(UserRepliesRepository)
    private readonly _userRepliesRepository: UserRepliesRepository,
    @InjectRepository(Quiz)
    private readonly _quizRepository: Repository<Quiz>,
    @Inject(FinalizeQuizService)
    private readonly _finalizeQuizService: FinalizeQuizService,
  ) {}

  async execute(userId: string, quizId: string) {
    const userReplies = await this._userRepliesRepository.getRepliesByUser(
      userId,
      quizId,
    );

    const resultQuiz = userReplies.reduce(
      ({ correctAnswers, incorrectAnswers }, answer) => {
        answer.isCorrect === true ? correctAnswers++ : incorrectAnswers++;
        return { correctAnswers, incorrectAnswers };
      },
      { correctAnswers: 0, incorrectAnswers: 0 },
    );

    const getQuiz = await this._quizRepository.findOne({ id: quizId });

    if (!getQuiz)
      throw new BadRequestException([
        { property: 'quizId', error: 'Quiz não encontrado' },
      ]);

    return this._quizRepository.save({
      ...getQuiz,
      finalizedAt: new Date(),
      amountOfCorrect: resultQuiz.correctAnswers,
      amountOfErrors: resultQuiz.incorrectAnswers,
      fineshedTime: 660,
    });
  }
}
