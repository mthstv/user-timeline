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
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne({ id });
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
  findOneByUserId(@Param('userId') userId: string) {
    return this.profilesService.findOne({ userId });
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }
}
