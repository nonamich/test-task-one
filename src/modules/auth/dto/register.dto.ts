import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '~/modules/users/dto';

export class RegisterDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
