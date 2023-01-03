import { IsEmail } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { ClubUser } from "./ClubUser";

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
}
