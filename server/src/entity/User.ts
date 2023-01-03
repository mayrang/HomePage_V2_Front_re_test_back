import { IsEmail } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { ApplicationAnswer } from "./ApplicationAnswer";
import { ClubUser } from "./ClubUser";
import { Comment } from "./Comment";
import { Post } from "./Post";
import { Reservation } from "./Reservation";
import { UserProject } from "./UserProject";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  loginId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  rank: string;

  @Column()
  phoneNumber: number;

  @Column()
  @IsEmail(undefined, { message: "이메일 형식으로 작성해야 합니다." })
  email: string;

  @OneToOne(() => ClubUser, (clubUser) => clubUser.user)
  clubUser: ClubUser;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => UserProject, (userProject) => userProject.user)
  userProjects: UserProject[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => ApplicationAnswer, (applicationAnswer) => applicationAnswer.user)
  applicationAnswers: ApplicationAnswer[];
}
