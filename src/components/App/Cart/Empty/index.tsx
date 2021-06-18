import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ViewContainer, TextDescription } from "./styles";
import { colors } from "../../../../styles/colors";

interface EmptyCartProps {
  text: string;
}

export const EmptyCart = ({ text }: EmptyCartProps) => (
  <ViewContainer>
    <MaterialCommunityIcons name="cart-off" size={80} color={colors.red} />
    <TextDescription>{text}</TextDescription>
  </ViewContainer>
);
