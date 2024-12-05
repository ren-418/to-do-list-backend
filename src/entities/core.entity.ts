import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class CoreEntity {
  @CreateDateColumn({ name: "created_at" })
  createdAt;
  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt;
  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt;
}
