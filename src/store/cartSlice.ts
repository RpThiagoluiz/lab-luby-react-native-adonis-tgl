import { createSlice } from "@reduxjs/toolkit";
import { GameAddCart } from "../@types/gameAddCart";
import { api } from "../services/api";
import { formatValues } from "../utils";

interface GameForApi {
  game_id: number;
  numbers: any[];
  price: number;
}

const initialState = {
  games: [] as GameAddCart[],
  totalPrice: 0,
  saveMsg: { title: "", description: "" },
  loading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newBet: GameAddCart = action.payload;
      state.games.push(newBet);
      state.totalPrice = state.totalPrice + newBet.price;
    },

    removeItemToCart(state, action) {
      const id = action.payload;
      state.games = state.games.filter((bet) => bet.id !== id);
    },

    saveInApi(state, action) {
      // const cartItems = state.games;
      // const cartTotalPrice = state.totalPrice;

      // const asyncSendData = async () => {
      //   try {
      //     if (cartTotalPrice < 30) {
      //       const minPrice = 30; //gameChoice["min-cart-value"]
      //       state.loading = false;
      //       throw new Error(
      //         `Valor minimo para salvar o game nao atingido: ${formatValues(
      //           minPrice
      //         )}`
      //       );
      //     }

      //     const cart: any = [];

      //     cartItems.forEach((game) => {
      //       cart.push({
      //         game_id: game.game_id,
      //         numbers: game.gameNumbers.toString(),
      //         price: Number(game.price),
      //       });
      //     });

      //     const response = await api.post("/bets", {
      //       cart,
      //       cartTotalPrice,
      //     });

      //     if (response.status !== 200) {
      //       throw new Error(
      //         `Error ao enviar o game, tente novamente mais tarde.`
      //       );
      //     }
      //   } catch (error) {
      //     state.saveMsg = {
      //       title: `Correu um error 😐`,
      //       description: error.message,
      //     };
      //   }
      // };

      console.log(`save`);
    },
  },
});
