import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostModel } from './models';
import { PostsController } from './posts.controller';
import { PostsExternalService } from './posts.external.service';
import { PostsService } from './posts.service';

@Global()
@Module({
  providers: [PostsService, PostsExternalService],
  controllers: [PostsController],
  exports: [PostsService],
  imports: [SequelizeModule.forFeature([PostModel])],
})
export class PostsModule {}
