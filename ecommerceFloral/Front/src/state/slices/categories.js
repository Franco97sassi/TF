import { createSlice } from "@reduxjs/toolkit";
//import { recetas } from "../components/recetas";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],

    },

    reducers: {
        getAllCategories: (state, action) => {
            state.categories = action.payload
        },

    }
})

export const {
    getAllCategories,

} = categoriesSlice.actions

export default categoriesSlice.reducer