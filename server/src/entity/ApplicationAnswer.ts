import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplicationQuestion } from "./ApplicationQuestion";
import { User } from "./User";

@Entity("applicationanswers")
export class ApplicationAnswer extends BaseEntity {
  @PrimaryGeneratedColumn()
  applicationAnswerId: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  applicationQuestionId: number;

  @Column()
  answer1: string;
  @Column()
  answer2: string;

  @Column()
  answer3: string;

  @Column()
  answer4: string;

  @Column()
  answer5: string;

  @Column()
  answer6: string;

  @Column()
  answer7: string;

  @Column()
  answer8: string;

  @Column()
  answer9: string;

  @Column()
  answer10: string;

  @Column()
  answer11: string;

  @Column()
  answer12: string;

  @Column()
  answer13: string;

  @Column()
  answer14: string;

  @Column()
  answer15: string;

  @Column()
  answer16: string;
  @Column()
  answer17: string;
  @Column()
  answer18: string;
  @Column()
  answer19: string;
  @Column()
  answer20: string;
  @Column()
  answer21: string;
  @Column()
  answer22: string;
  @Column()
  answer23: string;
  @Column()
  answer24: string;
  @Column()
  answer25: string;

  @ManyToOne(() => User, (user) => user.applicationAnswers, { onDelete: "SET NULL" })
  @JoinColumn({ name: "userId", referencedColumnName: "userId" })
  user: User;

  @ManyToOne(() => ApplicationQuestion, (applicationQuestion) => applicationQuestion.applicationAnswers, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "applicationQuestionId", referencedColumnName: "applicationQuestionId" })
  applicationQuestion: ApplicationQuestion;
}
