import { ApiProperty } from '@nestjs/swagger';

export class LoggedInDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;
}
