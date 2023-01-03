import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("clubusers")
export class ClubUser extends BaseEntity {
  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.clubUser, { nullable: true })
  @JoinColumn({ name: "userId", referencedColumnName: "userId" })
  user: User;

  @Column()
  grade: number;

  @Column()
  blog: string;

  @Column()
  studentId: number;

  @Column()
  framework: string;

  @Column()
  language: string;
}
