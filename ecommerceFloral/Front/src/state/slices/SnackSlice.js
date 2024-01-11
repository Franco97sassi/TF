import { createSlice } from "@reduxjs/toolkit";
//import { recetas } from "../components/recetas";

export const snackSlice = createSlice({
    name: 'snack',
    initialState: {
        snack: [],

    },

    reducers: {
        getAllSnacks: (state, action) => {
            state.snack = action.payload
        },

    }
})

export const {
    getAllSnacks,

} = snackSlice.actions

export default snackSlice.reducer