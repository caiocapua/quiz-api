import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from 'src/repositories/categories.repository';
import { QuestionsRepository } from 'src/repositories/questions.repository';
import { UserRepliesRepository } from 'src/repositories/userReplies.repository';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { CategoriesController } from './categories.controller';
import { GetAllCategoriesService } from './services/getAllCategories.service';
import { GetQuestionsByCategory } from './services/getQuestionsByCategory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoriesRepository,
      QuestionsRepository,
      UserRepliesRepository,
    ]),
  ],
  controllers: [CategoriesController],
  providers: [GetAllCategoriesService, GetQuestionsByCategory, JwtStrategy],
})
export class CategoriesModule {}
