import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class InitializeQuizService {
  constructor(
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
  ) {}

  async execute(userId: string, categoryId: string) {
    const quizInitiated = await this.quizRepository.findOne({
      userId,
      finalizedAt: IsNull(),
    });

    if (quizInitiated) {
      return { quizExists: true, quizId: quizInitiated.id };
    }
    const quiz = await this.quizRepository.save({
      userId,
      categoryId,
    });

    return { quizId: quiz.id };
  }
}
