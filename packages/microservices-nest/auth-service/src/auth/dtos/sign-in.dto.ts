import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty()
  readonly email!: string;
  @ApiProperty()
  readonly password!: string;
}
