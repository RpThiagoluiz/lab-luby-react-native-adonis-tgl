import { cartSlice } from "../cartSlice";
import { GameAddCart } from "../../@types/gameAddCart";

const cartActions = cartSlice.actions;

export const addCartItem = (cartItem: GameAddCart) => {
  return cartActions.addItemToCart(cartItem);
};

export const DeleteCartItem = (index: string) => {
  return cartActions.removeItemToCart(index);
};

export const SaveCartInApi = (
  // cartsGames: GameAddCart[],
  // totalPrice: number
  text: string
) => {
  // const games = {
  //   cartsGames,
  //   totalPrice,
  // };

  return cartActions.saveInApi(text);
};
