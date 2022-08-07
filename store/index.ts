import { configureStore } from "@reduxjs/toolkit";
import UISlice from "../slices/UISlice";
import entriesSlice from "../slices/entriesSlice";

export const store = configureStore({
  reducer: {
    UI: UISlice,
    entries: entriesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
