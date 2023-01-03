import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedules")
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  calendarId: number;

  @Column()
  date: Date;

  @Column()
  time: number;
}
