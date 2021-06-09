import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  InputContent,
  LabelText,
  PassIconWrapper,
  PasswordWrapper,
  TextInput,
} from "./styles";
import { colors } from "../../../styles/colors";

export const InputPassWrapper = () => (
  <InputContent>
    <PasswordWrapper>
      <LabelText>Password</LabelText>
      <PassIconWrapper>
        <FontAwesome5 name="eye" size={32} color={colors.gray_300} />
      </PassIconWrapper>
    </PasswordWrapper>
    <TextInput />
  </InputContent>
);
