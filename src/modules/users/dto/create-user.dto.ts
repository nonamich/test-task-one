import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { InferCreationAttributes } from 'sequelize';
import { UserModel } from '../models';

export class CreateUserDto
  implements Pick<InferCreationAttributes<UserModel>, 'email'>
{
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsStrongPassword()
  password!: string;
}
