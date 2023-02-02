import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api-slice";
import cartSlice from "./features/cart-slice";
import filterSlice from "./features/filter-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
