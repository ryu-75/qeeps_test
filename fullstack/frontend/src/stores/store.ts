import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";

const reducer = {
  [api.reducerPath]: api.reducer,
  // auth: auth.reducer,
} as const;

export function initStore() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([api.middleware]),
  });
}

export const store = initStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type Store = ReturnType<typeof initStore>;

export default store;
