import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice.js";
import favoritesReducers from "./features/auth/favorites/favoriteSlice"
import { getFavoritesFromLocalStorage } from "../../Utils/localStorage.js";

const initialFavorites = getFavoritesFromLocalStorage() || [];

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducers,
  },
  preloadedState: {
    favorites: initialFavorites,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],
});

setupListeners(store.dispatch);
export default store;
