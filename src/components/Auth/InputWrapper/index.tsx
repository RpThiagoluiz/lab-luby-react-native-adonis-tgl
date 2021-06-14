import React from "react";
import { View } from "react-native";

import { InputContent, LabelText, TextInput, TextError } from "./styles";

interface InputWrapperProps {
  text: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onChangeText?: (value: string) => void;
  value?: string;
  validData?: boolean;
  placeholder?: string;
  inputError?: boolean;
  inputErrorText?: string;
}

export const InputWrapper = ({
  text,
  onBlur,
  onFocus,
  onChangeText,
  validData,
  inputError,
  inputErrorText,
  placeholder,
  value,
}: InputWrapperProps) => {
  return (
    <View>
      <InputContent validData={validData} existsError={inputError}>
        <LabelText>{text}</LabelText>
        <TextInput
          onBlur={onBlur}
          onFocus={onFocus}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
        />
      </InputContent>
      {inputError && <TextError>{inputErrorText}</TextError>}
    </View>
  );
};
