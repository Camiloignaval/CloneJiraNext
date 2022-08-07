import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  sideBarIsOpen: boolean;
  isDragging: boolean;
}

const initialState: UIState = {
  sideBarIsOpen: false,
  isDragging: false,
};

export const UISlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.sideBarIsOpen = !state.sideBarIsOpen;
    },
    toggleDragging: (state) => {
      state.isDragging = !state.isDragging;
    },
  },
});

export const { toggleSideBar, toggleDragging } = UISlice.actions;

export default UISlice.reducer;
