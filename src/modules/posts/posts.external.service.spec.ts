import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PostModel } from './models';
import { PostsExternalService } from './posts.external.service';

describe('PostsExternalService', () => {
  let service: PostsExternalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsExternalService,
        {
          provide: getModelToken(PostModel),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PostsExternalService>(PostsExternalService);
  });

  it('should fetch posts correctly', async () => {
    const userId = 1;
    const posts = await service.findAll(userId);

    expect(posts).toBeInstanceOf(Array);
    expect(posts).not.toHaveLength(0);
  });
});
