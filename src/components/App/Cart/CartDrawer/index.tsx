import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
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
import {
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

export const CartDrawer = (props: DrawerContentComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const cartItems = useAppSelector((state) => state.cart.games);
  const cartTotalPrice = useAppSelector((state) => state.cart.totalPrice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    clearTimeout();
  }, []);

  useEffect(() => {}, [cartTotalPrice, cartTotalPrice]);

  const removeItemToCart = (id: string) => {
    dispatch(DeleteCartItem(id));
  };

  const saveGame = () => {
    console.log(cartItems);
    console.log(formatValues(cartTotalPrice));
    //dispatch(SaveCartInApi(`save`));
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
            ) : cartItems.length > 0 ? (
              <BetsFlatCartList
                games={cartItems}
                handleOnTrashPress={removeItemToCart}
              />
            ) : (
              <EmptyCart />
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
    </ScrollView>
  );
};
