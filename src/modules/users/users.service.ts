import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, FindOptions } from 'sequelize';
import { CreateUserDto } from './dto';
import { GetUserByCredentials } from './dto/get-user-by-credentials.dto';
import { UserModel } from './models';
import { PasswordService } from './password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly passwordService: PasswordService,
  ) {}

  async create({
    email,
    password: unsafePassword,
  }: CreateUserDto): Promise<UserModel> {
    const password = await this.passwordService.hashPassword(unsafePassword);

    return await this.userModel.create({
      email,
      password,
    });
  }

  async getOneOrThrow(
    attrs: FindOptions<Attributes<UserModel>>,
  ): Promise<UserModel> {
    const user = await this.userModel.findOne(attrs);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async getByCredentials({
    email,
    password,
  }: GetUserByCredentials): Promise<UserModel> {
    const user = await this.getOneOrThrow({
      where: {
        email,
      },
    });

    const isVerifiedPassword = await this.passwordService.verifyPassword(
      user.password,
      password,
    );

    if (!isVerifiedPassword) {
      throw new UnauthorizedException('password does not match');
    }

    return user;
  }
}
