import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice.js";
import authReducer from "./features/auth/authSlice.js";
import favoritesReducers from "./features/favorites/favoriteSlice.js";
import shopReducer from "./features/shop/shopSlice.js";
import { getFavoritesFromLocalStorage } from "../../Utils/localStorage.js";
import cartReducer from "./features/cart/cartSlice.js";

const initialFavorites = getFavoritesFromLocalStorage() || [];

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducers,
    cart: cartReducer,
    shop: shopReducer,
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
