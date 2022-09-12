import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Question } from 'src/entities/question.entity';
import { CategoriesRepository } from 'src/repositories/categories.repository';
import { UserRepliesRepository } from 'src/repositories/userReplies.repository';
import { MAX_QUANTITY_QUESTIONS_ANSWERED } from 'src/shared/constants/quantityQuestions.constants';

@Injectable()
export class GetQuestionsByCategory {
  constructor(
    private readonly _categoriesRepository: CategoriesRepository,
    private readonly _userRepliesRepository: UserRepliesRepository, // private readonly _quizRepository: Repository<Quiz>,
  ) {}

  async execute(
    categoryId: string,
    userId: string,
    quizId: string,
  ): Promise<Question> {
    const categories =
      await this._categoriesRepository.getQuestionAndRepliesByCategory(
        categoryId,
      );

    if (!categories)
      throw new NotFoundException([
        {
          property: 'categories',
          error: 'Nenhuma questão encontrada para essa categoria',
        },
      ]);

    const userReplies = await this._userRepliesRepository.getRepliesByUser(
      userId,
      quizId,
    );

    if (userReplies.length === MAX_QUANTITY_QUESTIONS_ANSWERED)
      throw new BadRequestException([
        {
          property: 'questions',
          error: 'Todas as perguntas finalizadas',
        },
      ]);

    const questions = categories.questions.filter(
      (question) =>
        !userReplies.some((replies) => replies.questionId === question.id),
    );

    const getQuestionSorted = questions.sort(() => Math.random() - 0.5).shift();

    return getQuestionSorted;
  }
}
