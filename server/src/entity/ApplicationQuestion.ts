import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApplicationAnswer } from "./ApplicationAnswer";

@Entity("applicationquestions")
export class ApplicationQuestion extends BaseEntity {
  @PrimaryGeneratedColumn()
  applicationQuestionId: number;

  @Column()
  category: string;

  @Column()
  question1: string;
  @Column()
  question2: string;

  @Column()
  question3: string;

  @Column()
  question4: string;

  @Column()
  question5: string;

  @Column()
  question6: string;

  @Column()
  question7: string;

  @Column()
  question8: string;

  @Column()
  question9: string;

  @Column()
  question10: string;

  @Column()
  question11: string;

  @Column()
  question12: string;

  @Column()
  question13: string;

  @Column()
  question14: string;

  @Column()
  question15: string;

  @Column()
  question16: string;
  @Column()
  question17: string;
  @Column()
  question18: string;
  @Column()
  question19: string;
  @Column()
  question20: string;
  @Column()
  question21: string;
  @Column()
  question22: string;
  @Column()
  question23: string;
  @Column()
  question24: string;
  @Column()
  question25: string;

  @OneToMany(() => ApplicationAnswer, (applicationAnswer) => applicationAnswer.applicationQuestion)
  applicationAnswers: ApplicationAnswer[];
}
