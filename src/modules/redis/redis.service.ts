import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(config: ConfigService) {
    super(config.getOrThrow('REDIS_URL'));
  }

  async onModuleDestroy(): Promise<void> {
    await this.quit();
  }
}
