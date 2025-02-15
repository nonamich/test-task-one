import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth, CurrentUser } from '../auth/decorators';
import { AuthorizedUserDto } from '../auth/dto';
import { PostDto } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Auth()
  @ApiOkResponse({ type: PostDto, isArray: true })
  @Get('/')
  async findAll(@CurrentUser() user: AuthorizedUserDto): Promise<PostDto[]> {
    return await this.postsService.findAll(user.id);
  }

  @Auth()
  @ApiOkResponse({ type: PostDto, isArray: true })
  @Get('/external')
  async findExternalAll(
    @CurrentUser() user: AuthorizedUserDto,
  ): Promise<PostDto[]> {
    return await this.postsService.findAllExternalAndSave(user.id);
  }
}
