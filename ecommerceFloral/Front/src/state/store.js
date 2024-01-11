import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';


import recipes from '../state/slices/recipeSlice';
import user from '../state/slices/userSlice';
import mode from '../state/slices/modeSlice';
import contador from './slices/contadorSlice';
import categories from './slices/categories';
import colors from './slices/colorSlice';
import products from './slices/productSlice';
import cartReducer from './slices/CartSlice';
import orden from './slices/OrdenSlice';
import snack from './slices/SnackSlice';




// Todos los  (Slices)

const rootReducer = combineReducers({
  mode: mode,
  recipes: recipes,
  user: user,
  contador: contador,
  categories: categories,
  colors: colors,
  products: products,
  cart: cartReducer,
  orden: orden,
  snack: snack,

});

const localStorageConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['mode', 'cart'] // especifica aquí los reductores que quieres persistir en Local Storage
};

const sessionConfig = {
  key: 'session',
  storage: sessionStorage,
  whitelist: ['user'] // especifica aquí los reductores que quieres persistir en Session Storage
};


const localStorageReducer = persistReducer(localStorageConfig, combineReducers({
  mode: mode,
  recipes: recipes,


}));


const sessionReducer = persistReducer(sessionConfig, combineReducers({
  user: user,
}));



export const store = configureStore({
  reducer: persistReducer(localStorageConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const sessionStore = configureStore({
  reducer: sessionReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
