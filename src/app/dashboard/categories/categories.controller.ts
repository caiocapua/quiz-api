import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { GetAllCategoriesService } from './services/getAllCategories.service';
import { GetQuestionsByCategory } from './services/getQuestionsByCategory.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly _getAllCategoriesService: GetAllCategoriesService,
    private readonly _getQuestionsByCategory: GetQuestionsByCategory,
  ) {}

  @Get()
  async getCategories() {
    return this._getAllCategoriesService.execute();
  }

  @Get(':categoryId/:userId/:quizId')
  async getQuestionAndRepliesByCategory(
    @Param('categoryId') categoryId: string,
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
  ) {
    return this._getQuestionsByCategory.execute(categoryId, userId, quizId);
  }
}
