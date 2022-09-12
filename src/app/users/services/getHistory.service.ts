import { InjectRepository } from '@nestjs/typeorm';
import { UserRepliesRepository } from 'src/repositories/userReplies.repository';
import { AllReplies } from '../dtos/ReturnResultAllQuiz.dto';

export class GetHistoryService {
  constructor(
    @InjectRepository(UserRepliesRepository)
    private readonly _userRepliesRepository: UserRepliesRepository,
  ) {}

  async execute(id: string): Promise<AllReplies> {
    const userReplies = await this._userRepliesRepository.getAllRepliesByUser(
      id,
    );

    const allReplies = userReplies.reduce(
      (
        { countCorrectAnswers, countIncorrectAnswers, totalQuestions },
        answer,
      ) => {
        answer.isCorrect === true
          ? countCorrectAnswers++
          : countIncorrectAnswers++;

        totalQuestions = countCorrectAnswers + countIncorrectAnswers;
        return { countCorrectAnswers, countIncorrectAnswers, totalQuestions };
      },
      { countCorrectAnswers: 0, countIncorrectAnswers: 0, totalQuestions: 0 },
    );

    return allReplies;
  }
}
