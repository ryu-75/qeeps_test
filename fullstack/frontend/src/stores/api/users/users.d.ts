// import { Metadata } from "../global.types";

export type UserBase = {
  _id: string;
  first_name?: string;
  last_name?: string;
  status: string;
  phone?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OtpBase = {
  email: string;
  otp: string;
  createdAt: Date;
}

export type UserBasePatch = Partial<UserBase>;

export interface UserResponse {
  data: Omit<UserBase, "_id," | "createdAt" | "updatedAt">; // TIPS: remove password field if backend sends it
  error: FetchBaseQueryError | SerializedError;
}
