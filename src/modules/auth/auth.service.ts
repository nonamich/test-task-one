import { Injectable } from '@nestjs/common';

import { UsersService } from '~/modules/users/users.service';
import { AuthTokenService } from './auth.token.service';
import { AuthorizedUserDto, LoggedInDto, LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: AuthTokenService,
  ) {}

  async register(data: RegisterDto): Promise<LoggedInDto> {
    const user = await this.userService.create(data);

    return await this.tokenService.generateTokensForNewSignin(user);
  }

  async login(data: LoginDto): Promise<LoggedInDto> {
    const user = await this.userService.getByCredentials(data);

    return await this.tokenService.generateTokensForNewSignin(user);
  }

  async logout(user: AuthorizedUserDto): Promise<void> {
    await this.tokenService.invalidateRefreshToken(user);
  }

  async refresh(user: AuthorizedUserDto): Promise<LoggedInDto> {
    return await this.tokenService.generateTokensForNewSignin(user);
  }
}
