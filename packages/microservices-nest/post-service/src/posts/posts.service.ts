import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const newPost = this.postsRepository.create({ ...createPostDto });
    return this.postsRepository.save(newPost);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findOne(id: string) {
    return this.postsRepository.findOneBy({ id });
  }

  findByUserId(userId: string) {
    return this.postsRepository.findOneBy({ createdBy: userId });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postsRepository.update(id, { ...updatePostDto });
  }

  remove(id: string) {
    return this.postsRepository.delete(id);
  }
}
