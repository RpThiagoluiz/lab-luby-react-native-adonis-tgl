import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";

export const store = configureStore({
  reducer: { cart: cartSlice.reducer },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    // serializableCheck: {
    //   //ignoredActions: ["cart/addItemToCart", "cart/removeItemToCart"],
    // },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
