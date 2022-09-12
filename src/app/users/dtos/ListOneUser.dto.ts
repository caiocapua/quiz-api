import { IsString } from 'class-validator';

export class ListOneUser {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;
}
