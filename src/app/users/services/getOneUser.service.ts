import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

export class GetOneUserService {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>,
  ) {}

  async execute(id: string): Promise<{ user: User }> {
    const user = await this._usersRepository.findOne(id);

    if (!user)
      throw new NotFoundException([
        {
          property: 'user',
          error: 'Usuário não enontrado',
        },
      ]);

    return { user };
  }
}
