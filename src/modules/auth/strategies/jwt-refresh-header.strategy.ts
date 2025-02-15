import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { UsersService } from '~/modules/users/users.service';
import authConfig from '../auth.config';
import { AUTH_REFRESH_STRATEGY_NAME } from '../auth.constants';
import { AuthTokenService } from '../auth.token.service';
import { JwtPayload } from '../auth.types';
import { AuthorizedUserDto } from '../dto';

@Injectable()
export class JwtRefreshHeaderStrategy extends PassportStrategy(
  Strategy,
  AUTH_REFRESH_STRATEGY_NAME,
) {
  jwtFromRequest: JwtFromRequestFunction;

  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: AuthTokenService,

    @Inject(authConfig.KEY)
    readonly config: ConfigType<typeof authConfig>,
  ) {
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    super({
      jwtFromRequest,
      secretOrKey: config.refresh.secret,
      passReqToCallback: true,
    });

    this.jwtFromRequest = jwtFromRequest;
  }

  async validate(
    request: Request,
    payload: JwtPayload,
  ): Promise<AuthorizedUserDto> {
    const user = await this.userService.getOneOrThrow({
      where: {
        uuid: payload.sub,
      },
    });
    const bearerToken = this.jwtFromRequest(request);
    const storedRefreshToken = await this.tokenService.getRefreshToken(user);

    if (bearerToken !== storedRefreshToken) {
      throw new UnauthorizedException();
    }

    return user.toJSON();
  }
}
