import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GetOneUserService } from '../services/getOneUser.service';
import { user, id, invalidId } from './mocks/users';

describe('Get one', () => {
  let getOneUserService: GetOneUserService;
  let usersRepository: Repository<User>;

  const mockRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOneUserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    getOneUserService = module.get<GetOneUserService>(GetOneUserService);

    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(getOneUserService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should return a one user', async () => {
      mockRepository.findOne.mockReturnValue(user);

      const result = await getOneUserService.execute(id);

      expect(result.user).toEqual(user);
      expect(result.user).toMatchObject(user);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should be able to return a exception when does not to find a user', () => {
      mockRepository.findOne.mockReturnValue(null);
      expect(getOneUserService.execute(invalidId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
    });
  });
});
