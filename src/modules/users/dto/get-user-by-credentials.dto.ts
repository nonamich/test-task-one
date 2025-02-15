import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class GetUserByCredentials extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
