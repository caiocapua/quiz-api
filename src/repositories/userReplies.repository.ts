import { UserReplies } from 'src/entities/userReplies.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserReplies)
export class UserRepliesRepository extends Repository<UserReplies> {
  async getRepliesByUser(userId: string, quizId: string) {
    return this.createQueryBuilder('userReplies')
      .where('userReplies.userId = :userId', { userId })
      .andWhere('userReplies.quizId = :quizId', { quizId })
      .getMany();
  }

  async getAllRepliesByUser(userId: string) {
    return this.createQueryBuilder('userReplies')
      .where('userReplies.userId = :userId', { userId })
      .getMany();
  }
}
