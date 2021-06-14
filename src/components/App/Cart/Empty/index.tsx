import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ViewContainer, TextDescription } from "./styles";
import { colors } from "../../../../styles/colors";

export const EmptyCart = () => (
  <ViewContainer>
    <MaterialCommunityIcons name="cart-off" size={80} color={colors.red} />
    <TextDescription>Seu Carrinho esta vazio 😞</TextDescription>
  </ViewContainer>
);
