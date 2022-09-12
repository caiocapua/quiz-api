import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { BcryptProvider } from 'src/providers/bcrypt/bcrypt.provider';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,
    @Inject(BcryptProvider)
    private readonly _bcryptProvider: BcryptProvider,
  ) {}

  async execute(data: CreateUserDto): Promise<User> {
    const userExists = await this._usersRepository.findOne({
      email: data.email,
    });

    if (userExists)
      throw new BadRequestException([
        {
          property: 'email',
          error: 'E-mail já cadastrado',
        },
      ]);

    const user = this._usersRepository.create({
      ...data,
      password: await this._bcryptProvider.genHash(data.password),
    });

    await this._usersRepository.save(user);
    return user;
  }
}
