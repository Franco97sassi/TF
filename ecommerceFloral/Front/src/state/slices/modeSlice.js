import { createSlice } from "@reduxjs/toolkit";


export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    mode: 'light'
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
  }
})

export const {
  setMode
} = modeSlice.actions

export default modeSlice.reducer