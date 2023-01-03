import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity("comments")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  content: string;

  @Column()
  parentId: string;

  @CreateDateColumn()
  postTime: Date;

  @Column()
  file: string;

  @Column({ nullable: true })
  id: number;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "SET NULL" })
  @JoinColumn({ name: "id", referencedColumnName: "userId" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "SET NULL" })
  @JoinColumn({ name: "postId", referencedColumnName: "postId" })
  post: Post;
}
