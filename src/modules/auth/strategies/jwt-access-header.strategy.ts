import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '~/modules/users/users.service';
import authConfig from '../auth.config';
import { AUTH_ACCESS_STRATEGY_NAME } from '../auth.constants';
import { JwtPayload } from '../auth.types';
import { AuthorizedUserDto } from '../dto';

@Injectable()
export class JwtAccessHeaderStrategy extends PassportStrategy(
  Strategy,
  AUTH_ACCESS_STRATEGY_NAME,
) {
  constructor(
    private readonly userService: UsersService,

    @Inject(authConfig.KEY)
    readonly config: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.access.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthorizedUserDto> {
    const user = await this.userService.getOneOrThrow({
      where: {
        uuid: payload.sub,
      },
    });

    return user.toJSON();
  }
}
