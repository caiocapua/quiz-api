import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RemoveUserService {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this._usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException([
        {
          property: 'user',
          error: 'Usuário não enontrado',
        },
      ]);
    }

    await this._usersRepository.softDelete(id);
  }
}
