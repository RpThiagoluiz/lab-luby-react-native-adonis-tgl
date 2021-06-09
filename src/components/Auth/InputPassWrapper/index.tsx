import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  InputContent,
  LabelText,
  PassIconWrapper,
  PasswordWrapper,
  TextInput,
} from "./styles";
import { colors } from "../../../styles/colors";

interface InputPassWrapperProps {
  onBlur?: () => void;
  onFocus?: () => void;
  onChangeText?: (value: string) => void;
  validData?: boolean;
}

export const InputPassWrapper = ({
  onBlur,
  onFocus,
  onChangeText,
  validData,
}: InputPassWrapperProps) => {
  const [isVisiblePass, setIsVisiblePass] = useState(true);

  return (
    <InputContent validData={validData}>
      <PasswordWrapper>
        <LabelText>Password</LabelText>
        <PassIconWrapper>
          <FontAwesome5
            name={isVisiblePass ? "eye" : "eye-slash"}
            size={32}
            color={isVisiblePass ? colors.gray_300 : colors.yellow_green}
            onPress={() => setIsVisiblePass((prevState) => !prevState)}
          />
        </PassIconWrapper>
      </PasswordWrapper>
      <TextInput
        secureTextEntry={isVisiblePass}
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeText={onChangeText}
      />
    </InputContent>
  );
};
