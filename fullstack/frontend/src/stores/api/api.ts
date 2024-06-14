import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api" as const,
  // TIPS: add headers here
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000", mode: "cors" }),
  endpoints: () => ({}),
});

export default api;
