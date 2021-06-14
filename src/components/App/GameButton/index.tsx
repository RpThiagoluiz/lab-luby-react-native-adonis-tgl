import React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { ContainerButton, TextDescription, TextActivy } from "./styles";

interface GameButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  isActive: boolean;
  color: string;
  gameName: string;
}

export const GameButton = ({
  onPress,
  isActive,
  color,
  gameName,
}: GameButtonProps) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <ContainerButton isActive={isActive} color={color}>
      <TextDescription isActive={isActive} color={color}>
        {gameName}
      </TextDescription>
      {isActive && <TextActivy>x</TextActivy>}
    </ContainerButton>
  </TouchableOpacity>
);
