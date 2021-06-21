import React, { useState, useEffect, useCallback } from "react";
import { Alert, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppContainer } from "../../Container";
import {
  ViewContainer,
  ViewHeaderContent,
  TextHeader,
  ViewClosedContainer,
  ViewWrapperFlatList,
  ViewWrapperSaveButton,
  ViewCartTotalContainer,
  ViewCartTotalText,
  TextStrong,
  TextItalic,
  TextPrice,
} from "./styles";
import {
  ClearCart,
  DeleteCartItem,
  SaveCartInApi,
} from "../../../../store/actions/betCartActions";
import { PressableText } from "../../../Auth/PressableText";
import { LoadingActivyIndicator } from "../../LoadingActivyIndicator";
import { EmptyCart } from "../Empty";
import { colors } from "../../../../styles/colors";
import { formatValues } from "../../../../utils";
import { useAppDispatch, useAppSelector } from "../../../../store/typedUse";
import { BetsFlatCartList } from "../BetsFlatCartList";
import { api } from "../../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface GameForApi {
  game_id: number;
  numbers: string;
  price: number;
}

export const CartDrawer = (props: DrawerContentComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const cartItems = useAppSelector((state) => state.cart.games);
  const cartTotalPrice = useAppSelector((state) => state.cart.totalPrice);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    clearTimeout();
  }, []);

  useEffect(() => {}, [cartTotalPrice, cartTotalPrice, dispatch]);

  const removeItemToCart = useCallback((id: string) => {
    //useCallBack Here. try
    dispatch(DeleteCartItem(id));
  }, []);

  const saveGame = async () => {
    setIsLoading(true);
    try {
      if (cartTotalPrice < 30) {
        setIsLoading(false);
        throw new Error(
          `Valor minimo para salvar o game nao atingido: ${formatValues(30)}`
        );
      }

      const betCartToSend: GameForApi[] = [];

      cartItems.forEach((game) => {
        betCartToSend.push({
          game_id: game.game_id,
          numbers: game.gameNumbers.toString(),
          price: Number(game.price),
        });
      });

      const items = {
        cart: betCartToSend,
        totalPrice: cartTotalPrice,
      };

      await api.post("/bets", items);
      setIsLoading(false);
      dispatch(ClearCart());
      Alert.alert(
        `Bet Realizada com Sucesso!`,
        `Veja seu historico de apostas, acessando sua conta.`
      );
      navigate("Home");
    } catch (error) {
      setIsLoading(false);
      Alert.alert(error.message);
    }
  };

  return (
    <ViewContainer>
      <AppContainer>
        <ViewClosedContainer>
          <Entypo
            name="cross"
            size={48}
            color={colors.yellow_green}
            style={{ position: "absolute", top: 2, right: 2 }}
            onPress={props.navigation.closeDrawer}
          />
        </ViewClosedContainer>
        <ViewHeaderContent>
          <MaterialCommunityIcons
            name="cart-outline"
            size={40}
            color={colors.yellow_green}
          />
          <TextHeader>CART</TextHeader>
        </ViewHeaderContent>

        <ViewWrapperFlatList>
          {isLoading ? (
            <LoadingActivyIndicator />
          ) : cartItems.length > 0 ? (
            <BetsFlatCartList
              games={cartItems}
              handleOnTrashPress={removeItemToCart}
            />
          ) : (
            <EmptyCart text="Seu Carrinho esta vazio 😞" />
          )}
        </ViewWrapperFlatList>

        <ViewCartTotalContainer>
          <ViewCartTotalText>
            <TextStrong>CART </TextStrong>
            <TextItalic>TOTAL: </TextItalic>
          </ViewCartTotalText>
          <TextPrice>{formatValues(cartTotalPrice)}</TextPrice>
        </ViewCartTotalContainer>

        <ViewWrapperSaveButton>
          <PressableText
            text="Save"
            color={colors.yellow_green}
            icon={{
              color: colors.yellow_green,
              name: "arrow-right",
              size: 40,
            }}
            onPress={saveGame}
          />
        </ViewWrapperSaveButton>
      </AppContainer>
    </ViewContainer>
  );
};
