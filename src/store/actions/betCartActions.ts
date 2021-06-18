import { cartSlice } from "../cartSlice";
import { GameAddCart } from "../../@types/gameAddCart";

const cartActions = cartSlice.actions;

export const addCartItem = (cartItem: GameAddCart) => {
  return cartActions.addItemToCart(cartItem);
};

export const DeleteCartItem = (id: string) => {
  return cartActions.removeItemToCart(id);
};

export const SaveCartInApi = (t: any) => {
  return cartActions.saveInApi(t);
};

export const ClearCart = () => {
  return cartActions.clearCart();
};
