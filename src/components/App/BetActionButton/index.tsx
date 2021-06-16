import React from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import { ViewContiner, Text } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";

interface BetActionButtonProps extends TouchableOpacityProps {
  text: string;
  isAddCart?: boolean;
}

export const BetActionButton = ({
  text,
  isAddCart,
  ...rest
}: BetActionButtonProps) => {
  if (!!isAddCart) {
    return (
      <TouchableOpacity activeOpacity={0.3} {...rest}>
        <ViewContiner isAddCart={true}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={20}
            color={colors.white}
          />
          <Text isAddCart={true}>{text}</Text>
        </ViewContiner>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.3} {...rest}>
      <ViewContiner>
        <Text>{text}</Text>
      </ViewContiner>
    </TouchableOpacity>
  );
};
