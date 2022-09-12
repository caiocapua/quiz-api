import { Question } from 'src/entities/question.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Question)
export class QuestionsRepository extends Repository<Question> {
  async getQuestionById(
    questionId: number,
    replyId: number,
  ): Promise<Question> {
    return this.createQueryBuilder('question')
      .leftJoinAndSelect('question.answers', 'answers')
      .where('question.id = :questionId', { questionId })
      .andWhere('answers.id = :replyId', { replyId })
      .getOne();
  }
}
