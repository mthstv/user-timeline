import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login to the platform' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieves access token',
    example: { access_token: 'token' },
  })
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'Signup to the platform' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully creates a user and retrieves access token',
    example: { access_token: 'token' },
    schema: {
      example: {
        email: 'email@test.com',
        password: 'password',
      },
    },
  })
  signUp(@Body() signUpDto: SignUpDTO) {
    return this.authService.signUp(signUpDto);
  }
}
