import { createSlice } from "@reduxjs/toolkit";

export const ordenSlice = createSlice({
  name: "orden",
  initialState: {
    orden: {},
  },
  reducers: {
    getOrden: (state, action) => {
      state.orden = action.payload;
    }
  },
});

export const {
  getOrden,
} = ordenSlice.actions;

export default ordenSlice.reducer;