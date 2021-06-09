import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ViewContainer, Text } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  color: string;
  icon: {
    color: string;
    size: number;
    name: "arrow-left" | "arrow-right";
  };
}
//rest sempre vai por ultimo
export const PressableText = ({
  text,
  color,
  icon,

  ...rest
}: ButtonProps) => {
  if (icon.name === "arrow-left") {
    return (
      <ViewContainer>
        <Feather name={icon.name} size={icon.size} color={icon.color} />
        <TouchableOpacity activeOpacity={0.6} {...rest}>
          <Text color={color} IsIconLeft={true}>
            {text}
          </Text>
        </TouchableOpacity>
      </ViewContainer>
    );
  }

  return (
    <ViewContainer>
      <TouchableOpacity activeOpacity={0.6} {...rest}>
        <Text color={color} IsIconLeft={false}>
          {text}
        </Text>
      </TouchableOpacity>
      <Feather name={icon.name} size={icon.size} color={icon.color} />
    </ViewContainer>
  );
};
