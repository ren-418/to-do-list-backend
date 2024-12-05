import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity("user")
export class UserEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid;
  @Column({ type: "varchar", nullable: true })
  username;
  @Column({ type: "varchar", nullable: false })
  email;
  @Column({ type: "varchar", nullable: false })
  password;
}
