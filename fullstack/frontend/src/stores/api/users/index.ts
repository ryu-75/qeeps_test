import api from "../api";
import { UserBase } from "./users";

const ENDPOINT = "users";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserBase[], void>({
      query: () => ENDPOINT,
    }),
    getUserById: builder.query<UserBase, string>({
      query: (id) => `${ENDPOINT}/${id}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
