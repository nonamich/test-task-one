import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '~/modules/users/users.module';
import authConfig from './auth.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth.token.service';
import {
  JwtAccessHeaderStrategy,
  JwtRefreshHeaderStrategy,
} from './strategies';

@Module({
  providers: [
    AuthService,
    JwtAccessHeaderStrategy,
    JwtRefreshHeaderStrategy,
    AuthTokenService,
  ],
  controllers: [AuthController],
  imports: [
    ConfigModule.forFeature(authConfig),
    JwtModule.register({}),
    UsersModule,
    PassportModule,
  ],
})
export class AuthModule {}
