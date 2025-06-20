import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: {
    isOpen: false,
  },
  reducers: {
    onClose: (state) => {
      state.isOpen = false;
    },
    onOpen: (state) => {
      state.isOpen = true;
    },
  },
});

export const { onClose, onOpen } = notificationSlice.actions;

export default notificationSlice.reducer;
