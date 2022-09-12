import { Category } from 'src/entities/category.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async getCategories(): Promise<Category[]> {
    const queryBuilder = this.createQueryBuilder('category').getMany();

    return queryBuilder;
  }

  async getQuestionAndRepliesByCategory(categoryId: string) {
    return this.createQueryBuilder('category')
      .innerJoinAndSelect('category.questions', 'questions')
      .innerJoinAndSelect('questions.answers', 'answers')
      .where('category.id = :categoryId', { categoryId })
      .getOne();
  }

  async getAllQuestionsByCategory(categoryId: string) {
    return this.createQueryBuilder('category')
      .innerJoinAndSelect('category.questions', 'questions')
      .where('category.id = :categoryId', { categoryId })
      .getMany();
  }
}
