import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '~/modules/redis/redis.service';
import authConfig from './auth.config';
import { JwtPayload } from './auth.types';
import { AuthorizedUserDto, LoggedInDto } from './dto';

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly redis: RedisService,

    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  async generateAccess(user: AuthorizedUserDto): Promise<string> {
    const payload = this.getPayloadFromUser(user);

    return await this.jwtService.signAsync(payload, {
      secret: this.config.access.secret,
      expiresIn: this.config.access.expiresIn,
    });
  }

  async generateRefresh(user: AuthorizedUserDto): Promise<string> {
    const payload = this.getPayloadFromUser(user);

    return await this.jwtService.signAsync(payload, {
      secret: this.config.refresh.secret,
      expiresIn: this.config.refresh.expiresIn,
    });
  }

  async generateRefreshAndSave(user: AuthorizedUserDto): Promise<string> {
    const token = await this.generateRefresh(user);

    await this.setRefreshToken(user, token);

    return token;
  }

  async generateTokensForNewSignin(
    user: AuthorizedUserDto,
  ): Promise<LoggedInDto> {
    const accessToken = await this.generateAccess(user);
    const refreshToken = await this.generateRefreshAndSave(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  getPayloadFromUser(user: AuthorizedUserDto): JwtPayload {
    return {
      sub: user.uuid,
    };
  }

  async setRefreshToken(user: AuthorizedUserDto, token: string): Promise<void> {
    await this.redis.set(
      this.getRefreshTokenRedisKey(user),
      token,
      'EX',
      this.config.refresh.expiresIn,
    );
  }

  async getRefreshToken(user: AuthorizedUserDto): Promise<string | null> {
    return await this.redis.get(this.getRefreshTokenRedisKey(user));
  }

  async invalidateRefreshToken(user: AuthorizedUserDto): Promise<void> {
    await this.redis.del(this.getRefreshTokenRedisKey(user));
  }

  getRefreshTokenRedisKey(user: AuthorizedUserDto): string {
    return `refresh:${user.uuid}`;
  }
}
