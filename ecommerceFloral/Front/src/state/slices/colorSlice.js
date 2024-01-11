import { createSlice } from "@reduxjs/toolkit";
//import { recetas } from "../components/recetas";

export const colorSlice = createSlice({
    name: 'colors',
    initialState: {
        colors: [],

    },

    reducers: {
        getAllColors: (state, action) => {
            state.colors = action.payload
        },

    }
})

export const {
    getAllColors,

} = colorSlice.actions

export default colorSlice.reducer