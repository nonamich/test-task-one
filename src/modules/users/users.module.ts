import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models';
import { PasswordService } from './password.service';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  exports: [UsersService],
  providers: [UsersService, PasswordService],
})
export class UsersModule {}
