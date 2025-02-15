import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { InferAttributes } from 'sequelize';
import { UserModel } from '~/modules/users/models';

export class AuthorizedUserDto implements InferAttributes<UserModel> {
  @ApiHideProperty()
  @Exclude()
  id!: number;

  @ApiProperty()
  uuid!: string;

  @ApiProperty()
  email!: string;

  @ApiHideProperty()
  @Exclude()
  password!: string;
}
