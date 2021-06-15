import React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { ContainerButton, TextValue } from "./styles";

interface GameButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  isActive: boolean;
  color: string;
  stringValue: string;
  size?: string;
}

export const NewBetButton = ({
  onPress,
  isActive,
  color,
  stringValue,
  size,
}: GameButtonProps) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <ContainerButton isActive={isActive} color={color} size={size}>
      <TextValue isActive={isActive} color={color}>
        {stringValue}
      </TextValue>
    </ContainerButton>
  </TouchableOpacity>
);
