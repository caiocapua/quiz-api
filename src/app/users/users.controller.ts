import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { AllReplies } from './dtos/ReturnResultAllQuiz.dto';
import { CreateUserService } from './services/createUser.service';
import { GetOneUserService } from './services/getOneUser.service';
import { GetHistoryService } from './services/getHistory.service';
import { RemoveUserService } from './services/removeUser.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly _createUserService: CreateUserService,
    private readonly _getOneUserService: GetOneUserService,
    private readonly _removeUserService: RemoveUserService,
    private readonly _getHistoryService: GetHistoryService,
  ) {}

  @Get(':id')
  async getOneUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ user: User }> {
    return this._getOneUserService.execute(id);
  }

  @Get('dashboard/:id')
  async getResultAllQuiz(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AllReplies> {
    return this._getHistoryService.execute(id);
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this._createUserService.execute(data);
  }

  @Delete(':id')
  async removeUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this._removeUserService.execute(id);
  }
}
