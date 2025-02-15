import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { AuthorizedUserDto } from '../dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthorizedUserDto | undefined => {
    const { user } = ctx.switchToHttp().getRequest<Request>();

    return user;
  },
);
