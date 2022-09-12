import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { BcryptProvider } from 'src/providers/bcrypt/bcrypt.provider';
import { UserRepliesRepository } from 'src/repositories/userReplies.repository';
import { AuthModule } from '../auth/auth.module';
import { CreateUserService } from './services/createUser.service';
import { GetOneUserService } from './services/getOneUser.service';
import { GetHistoryService } from './services/getHistory.service';
import { RemoveUserService } from './services/removeUser.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User, UserRepliesRepository]),
  ],
  providers: [
    UsersService,
    CreateUserService,
    GetOneUserService,
    RemoveUserService,
    BcryptProvider,
    GetHistoryService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
