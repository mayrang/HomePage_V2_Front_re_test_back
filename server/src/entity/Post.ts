import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  category: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  postTime: Date;

  @Column({ nullable: true })
  file: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "SET NULL" })
  @JoinColumn({ name: "userId", referencedColumnName: "userId" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
