import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  AUTH_ACCESS_STRATEGY_NAME,
  AUTH_REFRESH_STRATEGY_NAME,
} from '../auth.constants';

@Injectable()
export class JwtAccessOrRefreshGuard extends AuthGuard([
  AUTH_ACCESS_STRATEGY_NAME,
  AUTH_REFRESH_STRATEGY_NAME,
]) {}
