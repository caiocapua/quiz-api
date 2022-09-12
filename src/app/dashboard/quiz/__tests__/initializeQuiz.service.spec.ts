import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { userId } from '../../categories/__tests__/mocks/categories';
import { InitializeQuizService } from '../service/initializeQuiz.service';
import { categoryId, quiz, quizExists, quizId } from './mocks/quiz';

describe('Initialize a new quiz game', () => {
  let initializeQuizService: InitializeQuizService;
  let quizRepository: Repository<Quiz>;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InitializeQuizService,
        {
          provide: getRepositoryToken(Quiz),
          useValue: mockRepository,
        },
      ],
    }).compile();

    initializeQuizService = module.get<InitializeQuizService>(
      InitializeQuizService,
    );

    quizRepository = module.get<Repository<Quiz>>(getRepositoryToken(Quiz));
  });

  it('should be defined', () => {
    expect(initializeQuizService).toBeDefined();
    expect(quizRepository).toBeDefined();
  });

  beforeEach(() => {
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
  });

  describe('execute', () => {
    it('should be initialize a new quiz game', async () => {
      mockRepository.findOne.mockReturnValue(undefined);
      mockRepository.save.mockReturnValue(quiz);

      const result = await initializeQuizService.execute(userId, categoryId);

      expect(result).toEqual({ quizId });
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('should be return an exception when exists a quiz game', async () => {
      mockRepository.findOne.mockReturnValue(quiz);

      const result = await initializeQuizService.execute(userId, categoryId);

      expect(result).toMatchObject(quizExists);
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
  });
});
