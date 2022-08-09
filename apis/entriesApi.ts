import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Entry, EntryState } from "../interfaces";

// Define a service using a base URL and expected endpoints
export const entriesApi = createApi({
  reducerPath: "entriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Entries"],
  endpoints: (builder) => ({
    getEntries: builder.query<Entry[], void>({
      query: () => ({
        url: `/entries`,
        method: "GET",
      }),
      providesTags: ["Entries"],
    }),
    newEntry: builder.mutation<Entry, object>({
      query: (body) => ({
        url: `/entries`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Entries"],
    }),
    updateEntry: builder.mutation<Entry, object>({
      query: (body) => ({
        url: `/entries`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Entries"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetEntriesQuery,
  useNewEntryMutation,
  useUpdateEntryMutation,
} = entriesApi;
