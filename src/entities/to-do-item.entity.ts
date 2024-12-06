import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
@Entity("user")
export class ToDoItemEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  itemId;
  @Column({ type: "varchar", nullable: false })
  title;
  @Column({ type: "varchar", nullable: false })
  description;
  @Column({ type: Boolean, nullable: false })
  status;
  @Column({ type: Date, nullable: true })
  dueDate;
}
