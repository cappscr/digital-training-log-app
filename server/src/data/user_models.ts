import { UUID } from "crypto";

export interface User {
  id?: UUID;
  username: string;
  name: string;
}