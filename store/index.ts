import { configureStore } from "@reduxjs/toolkit";
import UISlice from "../slices/UISlice";
import entriesSlice from "../slices/entriesSlice";
import { entriesApi } from "../apis/entriesApi";

export const store = configureStore({
  reducer: {
    UI: UISlice,
    entries: entriesSlice,

    // APIS

    [entriesApi.reducerPath]: entriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(entriesApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
