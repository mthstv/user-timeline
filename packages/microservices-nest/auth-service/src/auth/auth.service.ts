import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDTO): Promise<{ access_token: string }> {
    try {
      const { email, password } = signInDto;

      const user = await this.usersService.findOne(email);

      const isMatch = await bcrypt.compare(password, user?.password || '');

      if (!user || !isMatch) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async signUp(signUpDto: SignUpDTO): Promise<{ access_token: string }> {
    try {
      if (!signUpDto) {
        throw new BadRequestException('Invalid input');
      }

      const { email, password } = signUpDto;

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const user = await this.usersService.create({ email, password: hash });

      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
