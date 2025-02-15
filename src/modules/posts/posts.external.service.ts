import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import undici from 'undici';
import { PostModel } from './models';
import { PostExternal } from './posts.types';

@Injectable()
export class PostsExternalService {
  constructor(
    @InjectModel(PostModel) private readonly postModel: typeof PostModel,
  ) {}

  async savePosts(posts: PostExternal[]): Promise<PostModel[]> {
    if (!posts.length) {
      return [];
    }

    return await this.postModel.bulkCreate(
      posts.map((post) => {
        return {
          title: post.title,
          body: post.body,
          userId: post.userId,
        };
      }),
    );
  }

  async findAll(userId: number): Promise<PostExternal[]> {
    const requestInfo = new URL(
      '/posts',
      'https://jsonplaceholder.typicode.com',
    );

    requestInfo.searchParams.append('userId', userId.toString());

    const response = await undici.fetch(requestInfo);
    const posts = (await response.json()) as PostExternal[];

    return posts;
  }
}
