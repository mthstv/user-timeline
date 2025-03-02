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
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Request() req: { user: AuthUserDto },
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create({
      createdBy: req.user?.sub,
      ...createPostDto,
    });
  }

  @Post('/like')
  likePost(
    @Request() req: { user: AuthUserDto },
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.postsService.addOrRemoveLikeToPost({
      userId: req.user?.sub,
      ...createLikeDto,
    });
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/user/auth')
  findByAuthUser(@Request() req: { user: AuthUserDto }) {
    return this.postsService.findByUserId(req.user?.sub);
  }

  @Get('/user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.postsService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Request() req: { user: AuthUserDto },
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, req.user?.sub, updatePostDto);
  }

  @Delete(':id')
  remove(@Request() req: { user: AuthUserDto }, @Param('id') id: string) {
    return this.postsService.remove(id, req.user?.sub);
  }
}
