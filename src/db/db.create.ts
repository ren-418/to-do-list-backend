import { createDatabase } from "typeorm-extension";
import { Env } from "../env";
import { UserEntity } from "../entities";

export const dbCreate = async () => {
  await createDatabase({
    ifNotExist: true,
    options: {
      type: "mysql",
      host: Env.host,
      username: Env.username,
      password: Env.password,
      port: Env.dbPort,
      database: Env.dbName,
      entities: [UserEntity],
    },
  });
};
