import { createSlice } from "@reduxjs/toolkit";
//import { recetas } from "../components/recetas";

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],

    },

    reducers: {
        getAllProducts: (state, action) => {
            state.products = action.payload
        },

    }
})

export const {
    getAllProducts,

} = productSlice.actions

export default productSlice.reducer