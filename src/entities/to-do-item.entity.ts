import { Entity, PrimaryColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CoreEntity } from "./core.entity";
@Entity("todoitem")
export class ToDoItemEntity extends CoreEntity {
  @PrimaryColumn({ type: "varchar", length: 36 })
  id: string = uuidv4();
  @Column()
  user_id:string;
  @Column()
  title: string;
  @Column({ nullable: false })
  description: string;
  @Column({ default: "Pending" }) 
  status: string;
  @Column()
  priority: string;
  @Column({nullable:true})
  due_date: Date ;
}
