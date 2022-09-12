import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { CategoriesRepository } from 'src/repositories/categories.repository';

@Injectable()
export class GetAllCategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly _categoriesRepository: CategoriesRepository,
  ) {}

  async execute() {
    const categories: Category[] =
      await this._categoriesRepository.getCategories();
    return { categories };
  }
}
