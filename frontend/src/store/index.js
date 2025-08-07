import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/slice";
import { cartSlice } from "./cart/slice";
import { productsSlice } from "./products/slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
  },
});
