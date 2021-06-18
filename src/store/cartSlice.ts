import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GameAddCart } from "../@types/gameAddCart";
import { api } from "../services/api";

interface GameForApi {
  game_id: number;
  numbers: any[];
  price: number;
}

interface betsProps {
  cart: GameForApi[];
  totalPrice: number;
}

const initialState = {
  games: [] as GameAddCart[],
  totalPrice: 0,
  loading: true,
};

const postBets = createAsyncThunk("cart/postBets", async (bets: betsProps) => {
  const response = await api.post(`bets`, bets);
  return response.data;
});

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

    saveInApi(state) {
      try {
        state.loading = true;

        const betCartToSend: GameForApi[] = [];

        state.games.forEach((game) => {
          betCartToSend.push({
            game_id: game.game_id,
            numbers: game.gameNumbers.toString(),
            price: Number(game.price),
          });
        });

        const items = {
          cart: betCartToSend,
          totalPrice: state.totalPrice,
        };

        postBets(items);
        state = initialState;
        // state.games = [];
        // state.totalPrice = 0;
        // state.loading = false;
      } catch (error) {
        state.loading = false;
        throw new Error(error);
      }
    },

    clearCart(state) {
      state.games = [];
      state.totalPrice = 0;
    },
    loadingNewBets(state) {
      state.loading = false;
    },
  },
});
