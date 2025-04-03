import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
  @ApiProperty()
  readonly email!: string;
  @ApiProperty()
  readonly password!: string;
}
