import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthorizedUserDto, LoggedInDto, LoginDto, RegisterDto } from './dto';
import { JwtAccessOrRefreshGuard } from './guards';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: LoggedInDto })
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<LoggedInDto> {
    return await this.authService.register(dto);
  }

  @ApiOkResponse({ type: LoggedInDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoggedInDto> {
    return await this.authService.login(dto);
  }

  @ApiOkResponse({ type: LoggedInDto })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAccessOrRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@CurrentUser() user: AuthorizedUserDto): Promise<LoggedInDto> {
    return await this.authService.refresh(user);
  }

  @ApiOkResponse()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAccessOrRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@CurrentUser() user: AuthorizedUserDto): Promise<void> {
    await this.authService.logout(user);
  }

  @Auth()
  @ApiOkResponse({ type: AuthorizedUserDto })
  @SerializeOptions({ type: AuthorizedUserDto })
  @Get('me')
  me(@CurrentUser() user: AuthorizedUserDto): AuthorizedUserDto {
    return user;
  }
}
