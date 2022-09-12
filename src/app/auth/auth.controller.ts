import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { LoginDto } from './dtos/login.dto';
import { SignInAuthGuard } from './guards/sigInAuth.guard';
import { SignInService } from './services/signIn.service';

@Controller()
export class AuthController {
  constructor(private readonly _signInService: SignInService) {}

  @IsPublic()
  @UseGuards(SignInAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async findUserByEmail(@Body() data: LoginDto) {
    return this._signInService.execute(data);
  }
}
