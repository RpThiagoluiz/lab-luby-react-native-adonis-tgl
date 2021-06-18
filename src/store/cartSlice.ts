import { createSlice } from "@reduxjs/toolkit";
import { GameAddCart } from "../@types/gameAddCart";
import { api } from "../services/api";

interface GameForApi {
  game_id: number;
  numbers: any[];
  price: number;
}

const initialState = {
  games: [] as GameAddCart[],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      try {
        const newBet: GameAddCart = action.payload;
        state.games.push(newBet);

        const total = state.games.reduce((sumTotal, games) => {
          return sumTotal + Number(games.price);
        }, 0);

        state.totalPrice = total;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    removeItemToCart(state, action) {
      console.log(action.payload);

      const betAction = action.payload;

      try {
        state.games = state.games.filter((bet) => bet.id !== betAction);
        const total = state.games.reduce((sumTotal, games) => {
          return sumTotal + Number(games.price);
        }, 0);

        state.totalPrice = total;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    saveInApi(state, action) {
      //Move here
    },
    clearCart(state) {
      state.games = [];
      state.totalPrice = 0;
    },
  },
});
