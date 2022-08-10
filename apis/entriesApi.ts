import { SerializedError } from "@reduxjs/toolkit";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { Entry, EntryState } from "../interfaces";
import { stylesRht } from "../utils/stylesRht";

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
    updateEntry: builder.mutation<Entry, any>({
      query: (body) => ({
        url: `/entries/${body._id}`,
        method: "PUT",
        body,
      }),
      onQueryStarted(_, api) {
        toast.promise(
          api.queryFulfilled,
          {
            loading: "Guardando...",
            success: "Tarea actualizada",
            error: "Error al guardar la tarea",
          },
          stylesRht
        );
      },
      invalidatesTags: ["Entries"],
    }),
    deleteEntry: builder.mutation({
      query: (body) => ({
        url: `/entries/${body._id}`,
        method: "DELETE",
        body,
      }),
      onQueryStarted(_, api) {
        toast.promise(
          api.queryFulfilled,
          {
            loading: "Eliminando...",
            success: "Tarea eliminada",
            error: "Error al eliminar la tarea",
          },
          stylesRht
        );
      },
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
  useDeleteEntryMutation,
} = entriesApi;
