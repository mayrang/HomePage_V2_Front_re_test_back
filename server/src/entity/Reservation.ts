import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("reservations")
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  calendarId: number;

  @Column()
  date: Date;

  @Column()
  time: number;

  @Column({ nullable: true })
  id: number;

  @ManyToOne(() => User, (user) => user.reservations, { onDelete: "SET NULL" })
  @JoinColumn({ name: "id", referencedColumnName: "userId" })
  user: User;
}
