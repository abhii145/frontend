import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const dashboardAPI = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKENDSERVER_URL}/dashboard/`,
  }),
  tagTypes: ["dashboard"],
  endpoints: (builder) => ({
    stats: builder.query({
      query: (id: string) => `stats?id=${id}`,
    }),
    pie: builder.query({
      query: (id: string) => `pie?id=${id}`,
    }),
    bar: builder.query({
      query: (id: string) => `bar?id=${id}`,
    }),
    line: builder.query({
      query: (id: string) => `line?id=${id}`,
    }),
  }),
});

export const { useBarQuery, useStatsQuery, usePieQuery, useLineQuery } =
  dashboardAPI;
