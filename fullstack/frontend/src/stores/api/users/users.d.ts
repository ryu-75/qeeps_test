// import { Metadata } from "../global.types";

export type UserBase = {
  _id: string;
  email: string;
  // TIPS: add more fields here
  // ...
  createdAt: Date;
  updatedAt: Date;
};

export type UserBasePatch = Partial<UserBase>;

export interface UserResponse {
  data: Omit<UserBase, "password">; // TIPS: remove password field if backend sends it
}
