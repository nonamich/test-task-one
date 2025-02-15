import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { PostModel } from './modules/posts/models';
import { UserModel } from './modules/users/models';

@Injectable()
export class DatabaseOptionsService implements SequelizeOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const nodeEnv = this.config.get('NODE_ENV');
    const synchronize = nodeEnv === 'development' || nodeEnv === 'test';

    return {
      dialect: this.config.getOrThrow('DB_DIALECT'),
      host: this.config.getOrThrow('DB_HOST'),
      port: +this.config.getOrThrow('DB_PORT'),
      username: this.config.getOrThrow('DB_USERNAME'),
      password: this.config.getOrThrow('DB_PASSWORD'),
      database: this.config.getOrThrow('DB_NAME'),
      models: [UserModel, PostModel],
      logging: nodeEnv === 'development',
      autoLoadModels: true,
      synchronize,
    };
  }
}
