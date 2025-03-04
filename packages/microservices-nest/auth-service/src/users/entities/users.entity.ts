import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'User ID' })
  id!: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty({ description: 'User email, used for logging in' })
  email!: string;

  @Column({ nullable: false })
  @ApiProperty({ description: 'User password, used for logging in' })
  password!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ description: 'Time the entity was created' })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ description: 'Last time the entity was modified' })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  @ApiProperty({ description: 'Time the entity was soft deleted' })
  deletedAt!: Date;
}
