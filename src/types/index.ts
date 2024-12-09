import { UserEntity } from "../entities";

export type PayloadType = {
  uuid: string;
};

export type CreateTitleType = {
  title: string;
  userId: UserEntity;
};

