import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { RedisService } from '../redis/redis.service';
import authConfig from './auth.config';
import { AuthTokenService } from './auth.token.service';
import { AuthorizedUserDto } from './dto';

describe('AuthTokenService', () => {
  let authTokenService: AuthTokenService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [
        AuthTokenService,
        {
          provide: RedisService,
          useValue: {},
        },
        {
          provide: authConfig.KEY,
          useValue: {
            access: {
              secret: 'access-secret',
              expiresIn: '1h',
            },
            refresh: {
              secret: 'refresh-secret',
              expiresIn: '7d',
            },
          },
        },
      ],
    }).compile();

    authTokenService = moduleRef.get<AuthTokenService>(AuthTokenService);
  });

  describe('generateAccess', () => {
    it('should generate an access token', async () => {
      const user: AuthorizedUserDto = {
        id: 1,
        uuid: 'uuid-uuid-uuid-uuid',
        email: 'e@e.com',
        password: 'password',
      };

      const accessToken = await authTokenService.generateAccess(user);
      const refreshToken = await authTokenService.generateRefresh(user);

      expect(accessToken).toBeTruthy();
      expect(refreshToken).toBeTruthy();
      expect(accessToken).not.toStrictEqual(refreshToken);
    });
  });
});
