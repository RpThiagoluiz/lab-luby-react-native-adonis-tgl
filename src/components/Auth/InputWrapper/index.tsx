import React from "react";
import { View } from "react-native";

import { InputContent, LabelText, TextInput, TextError } from "./styles";

interface InputWrapperProps {
  text: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onChangeText?: (value: string) => void;
  validData?: boolean;
  existsError?: boolean;
  inputError?: boolean;
  inputErrorText?: string;
}

export const InputWrapper = ({
  text,
  onBlur,
  onFocus,
  onChangeText,
  validData,
  existsError,
  inputError,
  inputErrorText,
}: InputWrapperProps) => {
  return (
    <View>
      <InputContent validData={validData} existsError={existsError}>
        <LabelText>{text}</LabelText>
        <TextInput
          onBlur={onBlur}
          onFocus={onFocus}
          onChangeText={onChangeText}
        />
      </InputContent>
      {inputError && <TextError>{inputErrorText}</TextError>}
    </View>
  );
};
