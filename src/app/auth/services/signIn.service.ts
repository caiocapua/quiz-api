import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { BcryptProvider } from 'src/providers/bcrypt/bcrypt.provider';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/login.dto';
import { IUserPayload } from '../interfaces/IUserPayload';
import { IUserToken } from '../interfaces/IUserToken';

@Injectable()
export class SignInService {
  constructor(
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,
    @Inject(BcryptProvider)
    private readonly _bcryptProvider: BcryptProvider,
    @Inject(JwtService)
    private readonly _jwtService: JwtService,
  ) {}

  async execute(data: LoginDto): Promise<IUserToken> {
    const user = await this._usersRepository.findOne({
      where: { email: data.email },
    });

    if (!user)
      throw new BadRequestException([
        { property: 'login', error: ['Login ou senha inválidos.'] },
      ]);

    const passwordMatched = await this._bcryptProvider.compareHash(
      data.password,
      user.password,
    );

    if (!passwordMatched)
      throw new BadRequestException([
        { property: 'login', error: ['Login ou senha inválidos.'] },
      ]);

    const payload: IUserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this._jwtService.sign(payload);

    return { access_token: jwtToken };
  }
}
