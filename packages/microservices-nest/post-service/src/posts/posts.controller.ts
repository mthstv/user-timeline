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
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUserDto } from 'src/auth/dtos/auth.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Request() req: { user: AuthUserDto },
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create({
      createdBy: req.user?.sub,
      ...createPostDto,
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/user:userId')
  @UseGuards(AuthGuard)
  findByUserId(
    @Request() req: { user: AuthUserDto },
    @Param('userId') userId: string,
  ) {
    return this.postsService.findByUserId(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
