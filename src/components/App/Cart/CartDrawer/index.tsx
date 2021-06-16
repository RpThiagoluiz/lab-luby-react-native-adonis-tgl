import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppContainer } from "../../AppContainer";
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
import { BetsFlatList } from "../../BetsFlatList";
import { PressableText } from "../../../Auth/PressableText";
import { LoadingActivyIndicator } from "../../LoadingActivyIndicator";
import { EmptyCart } from "../Empty";
import { colors } from "../../../../styles/colors";
import { Alert } from "react-native";
import { api } from "../../../../services/api";
import { formatValues } from "../../../../utils";
import { GameAddCart } from "../../../../@types/gameAddCart";

export const CartDrawer = (props: DrawerContentComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartsGames, setCartsGames] = useState<GameAddCart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    clearTimeout();
  }, []);

  useEffect(() => {
    const total = cartsGames.reduce((sumTotal, games) => {
      return sumTotal + Number(games.price);
    }, 0);

    setTotalPrice(total);
  }, [cartsGames]);

  const removeItemToCart = (id: string) => {
    setCartsGames((prevState) => prevState.filter((game) => game.id !== id));
  };

  const saveGame = async () => {
    setIsLoading(true);
    try {
      if (totalPrice < 30) {
        const minPrice = 30; //gameChoice["min-cart-value"]
        setIsLoading(false);
        throw new Error(
          `Valor minimo para salvar o game nao atingido: ${formatValues(
            minPrice
          )}`
        );
      }

      const cart: any = [];

      cartsGames.forEach((game) => {
        cart.push({
          game_id: game.game_id,
          numbers: game.gameNumbers.toString(),
          price: Number(game.price),
        });
      });

      const response = await api.post("/bets", {
        cart,
        totalPrice,
      });

      if (response.status !== 200) {
        throw new Error(`Error ao enviar o game, tente novamente mais tarde.`);
      }

      setCartsGames([]);
    } catch (error) {
      Alert.alert(`Error 😐`, error.message);
    }
  };

  return (
    <ScrollView>
      <ViewContainer>
        <AppContainer>
          <ViewClosedContainer>
            <Entypo
              name="cross"
              size={48}
              color={colors.yellow_green}
              style={{ position: "absolute", top: 2, right: 2 }}
              onPress={() => console.log(`ai`)}
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
            ) : (
              //       {/* Trazer os dados do cart, jogar na flat list do game, e salvar o game na Api */}
              //     {/* <BetsFlatList
              //   filtered={filteredGames} //nao precisa
              //   games={userBets}
              //   inCart={true}
              //   handleOnTrashPress={removeItemToCart}
              // /> */}
              <EmptyCart />
            )}
          </ViewWrapperFlatList>

          <ViewCartTotalContainer>
            <ViewCartTotalText>
              <TextStrong>CART </TextStrong>
              <TextItalic>TOTAL: </TextItalic>
            </ViewCartTotalText>
            <TextPrice>{formatValues(totalPrice)}</TextPrice>
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
    </ScrollView>
  );
};
