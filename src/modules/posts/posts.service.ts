import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostDto } from './dto';
import { PostModel } from './models';
import { PostsExternalService } from './posts.external.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel) private readonly postModel: typeof PostModel,
    private readonly postsExternalService: PostsExternalService,
  ) {}

  async findAll(userId: number): Promise<PostDto[]> {
    return await this.postModel.findAll({
      where: {
        userId,
      },
      raw: true,
    });
  }

  async findAllExternalAndSave(userId: number): Promise<PostDto[]> {
    const posts = await this.postsExternalService.findAll(userId);

    await this.postsExternalService.savePosts(posts);

    return posts;
  }
}
