import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FinalizeQuizService {
  constructor(
    @InjectRepository(Quiz) private readonly _quizRepository: Repository<Quiz>,
  ) {}

  async execute(quizId: string) {
    const quiz = await this._quizRepository.findOne({ id: quizId });

    if (!quiz) {
      throw new NotFoundException([
        {
          property: 'quiz',
          error: 'Quiz não enontrado',
        },
      ]);
    }

    const quizFinalized = await this._quizRepository.save({
      ...quiz,
      finalizedAt: new Date(),
    });

    return quizFinalized;
  }
}
