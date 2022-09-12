import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { BcryptProvider } from 'src/providers/bcrypt/bcrypt.provider';
import { AuthController } from './auth.controller';
import { SignInService } from './services/signIn.service';
import { SignInAuthStrategy } from './strategies/sigIn.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [SignInService, BcryptProvider, SignInAuthStrategy],
})
export class AuthModule {}
