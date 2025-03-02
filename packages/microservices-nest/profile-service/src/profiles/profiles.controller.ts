import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUserDto } from 'src/auth/dtos/auth.dto';

@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(
    @Request() req: { user: AuthUserDto },
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profilesService.create({
      userId: req.user?.sub,
      ...createProfileDto,
    });
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get('auth')
  findOneByAuth(@Request() req: { user: AuthUserDto }) {
    return this.profilesService.findOne({ userId: req.user?.sub });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne({ id });
  }

  @Get('user/:userId')
  findOneByUserId(@Param('userId') userId: string) {
    return this.profilesService.findOne({ userId });
  }

  @Patch()
  updateAuthProfile(
    @Request() req: { user: AuthUserDto },
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateByUserId(req.user?.sub, updateProfileDto);
  }

  @Delete()
  removeAuthProfile(@Request() req: { user: AuthUserDto }) {
    return this.profilesService.removeByUserId(req.user?.sub);
  }
}
