import api from "../api";
import { UserBase, UserResponse } from "./users";

const ENDPOINT = "users";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserBase[], void>({
      query: () => ENDPOINT,
    }),
    getUserById: builder.query<UserBase, string>({
      query: (id) => `${ENDPOINT}/${id}`,
    }),
    createUser: builder.mutation<UserResponse, Partial<UserBase>>({
      query: (user) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body:user,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation } = userApi;


// I should to use this builder to create, fetch or modify user data
