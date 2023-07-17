import { UserEntity } from "@entities/user.entity";

export interface LoginUserResponse {
  user: UserEntity;
  tokenJwt: string;
}
