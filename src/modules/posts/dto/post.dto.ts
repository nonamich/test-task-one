import { ApiProperty } from '@nestjs/swagger';
import { InferAttributes } from 'sequelize';
import { PostModel } from '../models';

export class PostDto implements InferAttributes<PostModel> {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  body!: string;

  @ApiProperty()
  userId!: number;
}
