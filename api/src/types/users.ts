import { Role } from "./roles";

export interface CreateUser {
  username: string;
  nama: string;
  password: string;
  roleId: string;
}

export interface User extends CreateUser {
  id: string;
  token: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginUser {
  username: string;
  password: string;
}
