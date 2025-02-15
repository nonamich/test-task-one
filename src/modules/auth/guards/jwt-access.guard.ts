import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_ACCESS_STRATEGY_NAME } from '../auth.constants';

@Injectable()
export class JwtAccessGuard extends AuthGuard(AUTH_ACCESS_STRATEGY_NAME) {}
