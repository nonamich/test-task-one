import { PickType } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class RefreshDto extends PickType(LoginDto, ['email', 'password']) {}
