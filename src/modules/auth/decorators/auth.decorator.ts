import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAccessGuard } from '../guards';

export function Auth(): ReturnType<typeof applyDecorators> {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(JwtAccessGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
