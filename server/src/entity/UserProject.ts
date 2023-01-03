import { BaseEntity, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity("userprojects")
export class UserProject extends BaseEntity {
  @PrimaryGeneratedColumn()
  userProjectId: number;

  @ManyToOne(() => User, (user) => user.userProjects)
  @JoinColumn({ name: "userId", referencedColumnName: "userId" })
  user: User;

  @ManyToMany(() => Project, (project) => project.userProjects)
  @JoinColumn({ name: "projectId", referencedColumnName: "projectId" })
  project: Project;
}
