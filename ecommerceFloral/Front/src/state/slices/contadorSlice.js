import { createSlice } from "@reduxjs/toolkit";

export const contadorSlice = createSlice({
  name: "contador",
  initialState: {
    contador: {},
  },
  reducers: {
    getContador: (state, action) => {
      state.contador = action.payload;
    },

  },
});

export const {
  getContador,

} = contadorSlice.actions;

export default contadorSlice.reducer;