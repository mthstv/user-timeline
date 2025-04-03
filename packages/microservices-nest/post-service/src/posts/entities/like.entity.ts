import {
  Entity,
  Column,
  CreateDateColumn,
  Unique,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
@Unique(['post', 'userId'])
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Post, (post) => post.likes)
  post!: Post;

  @Column({ nullable: false })
  userId!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date;
}
