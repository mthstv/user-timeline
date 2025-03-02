import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true, unique: true })
  username?: string;

  @Column({ nullable: true })
  displayName?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: false, unique: true })
  userId!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date;
}
