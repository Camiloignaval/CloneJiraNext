import { createSlice } from "@reduxjs/toolkit";
import { Entry } from "../interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface EntriesState {
  entries: Entry[];
}

const initialState: EntriesState = {
  entries: [],
};

export const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<Entry>) => {
      state.entries = [...state.entries, action.payload];
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const entry = state.entries.find((e) => e._id === action.payload.id)!;
      entry.status = action.payload.status;
    },
  },
});

export const { addEntry, changeStatus } = entriesSlice.actions;

export default entriesSlice.reducer;
