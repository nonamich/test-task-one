import { registerAs } from '@nestjs/config';
import { SECONDS_IN_MINUTE, SECONDS_IN_WEEK } from '@stdlib/constants-time';

export default registerAs('auth', () => ({
  access: {
    secret: process.env.JWT_ACCESS_SECRET!,
    expiresIn: SECONDS_IN_MINUTE * 15,
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET!,
    expiresIn: SECONDS_IN_WEEK,
  },
}));
