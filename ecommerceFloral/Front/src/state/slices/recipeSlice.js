import { createSlice } from "@reduxjs/toolkit";
//import { recetas } from "../components/recetas";

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        detail: {},
        allRecipes: [],
        meta: [],
        detailPost: [],
        ranking: 0,
        author: ''
    },

    reducers: {
        getAllRecipes: (state, action) => {
            state.recipes = action.payload.data.slice(0, 16)
            state.allRecipes = action.payload.data
            state.meta = action.payload.meta
            // console.log('receta',state.meta)
        },
        getAuthor: (state, action) => {
            state.author = action.payload
        },
        getDietsRecipe: (state, action) => {
            state.diets = action.payload
            state.allDiets = action.payload
        },
        getRecipeById: (state, action) => {
            state.detail = action.payload
        },
        getRecipesByName: (state, action) => {
            state.recipes = action.payload
        },
        createRecipe: (state, action) => {
            state.recipes = action.payload
        },
        deleteRecipe: (state, action) => {
            state.recipes = action.payload
        },
        getAllPost: (state, action) => {
            state.detailPost = action.payload
        },
        getRanking: (state, action) => {
            state.ranking = action.payload
        },
        orderByRating: (state, action) => {
            // eslint-disable-next-line
            // action.payload === "MENOR"? state.recipes.sort((a, b)=>{

            //     if (a.healthScore < b.healthScore) {
            //         return 1;
            //     }
            //     if(a.healthScore > b.healthScore) {
            //         return -1;
            //     }

            // }) :
            //     state.recipes.sort((a, b) => {

            //         if (a.healthScore < b.healthScore) {
            //             return -1;
            //         }
            //         if (a.healthScore > b.healthScore) {
            //             return 1;
            //         }
            //         return 0;
            //     })

        },
        filterByDiet: (state, action) => {

            // const recipes = state.recipes
            // const allrecipes = state.allrecipes

            // const dietsFil = action.payload === 'all' ? allrecipes : recipes.filter(recipe => {
            //     if(recipe.diets.length > 1){
            //         let dietsFilt = recipe.diets.map(di => di)
            //         console.log('slice',dietsFilt)
            //         return dietsFilt.includes(action.payload)
            //     }
            //     return dietsFil
            // })
            // console.log('asdsad',dietsFil)
            // state.recipes = dietsFil

        }
    }
})

export const {
    getAllRecipes,
    getAuthor,
    getRecipeById,
    getAllPost,
    getRanking,
    getRecipesByName,
    createRecipe,
    deleteRecipe,
    orderByRating,
    filterByDiet,
    getDietsRecipe
} = recipeSlice.actions

export default recipeSlice.reducer