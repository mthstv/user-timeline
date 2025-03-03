import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const newPost = this.postsRepository.create({ ...createPostDto });
    return this.postsRepository.save(newPost);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository
      .createQueryBuilder('post')
      .leftJoin('post.likes', 'like')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .getMany();
  }

  findOne(id: string) {
    return this.postsRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .leftJoin('post.likes', 'like')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .getOne();
  }

  findByUserId(userId: string) {
    return this.postsRepository
      .createQueryBuilder('post')
      .where('post.createdBy = :userId', { userId })
      .leftJoin('post.likes', 'like')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .getMany();
  }

  async update(id: string, createdBy: string, updatePostDto: UpdatePostDto) {
    await this.postsRepository.update({ id, createdBy }, { ...updatePostDto });

    return this.postsRepository.findOneBy({ id });
  }

  async remove(id: string, createdBy: string) {
    await this.postsRepository.delete({ id, createdBy });

    return { message: 'Post deleted successfully' };
  }

  async addOrRemoveLikeToPost(createLikeDto: CreateLikeDto) {
    const hasLike = await this.likesRepository.findOneBy({
      post: { id: createLikeDto.postId },
      userId: createLikeDto.userId,
    });

    const [, count] = await this.likesRepository.findAndCountBy({
      post: { id: createLikeDto.postId },
    });

    if (hasLike) {
      await this.likesRepository.delete({ id: hasLike.id });
      return { message: 'Like removed', likes: count - 1 };
    }

    const like = this.likesRepository.create({
      post: { id: createLikeDto.postId },
      userId: createLikeDto.userId,
    });

    await this.likesRepository.save(like);

    return { message: 'Like added', likes: count + 1 };
  }
}
