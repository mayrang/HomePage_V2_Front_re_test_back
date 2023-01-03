import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserProject } from "./UserProject";

@Entity("projects")
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  projectId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  postTime: Date;

  @Column()
  projectFile: string;

  @Column()
  state: string;

  @OneToMany(() => UserProject, (userProject) => userProject.project)
  userProjects: UserProject[];
}
