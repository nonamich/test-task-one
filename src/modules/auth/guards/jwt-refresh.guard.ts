import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_REFRESH_STRATEGY_NAME } from '../auth.constants';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(AUTH_REFRESH_STRATEGY_NAME) {}
