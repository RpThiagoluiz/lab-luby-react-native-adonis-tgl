import React from "react";

import { InputContent, LabelText, TextInput } from "./styles";

interface InputWrapperProps {
  text: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onChangeText?: (value: string) => void;
  validData?: boolean;
  existsError?: boolean;
}

export const InputWrapper = ({
  text,
  onBlur,
  onFocus,
  onChangeText,
  validData,
  existsError,
}: InputWrapperProps) => {
  return (
    <InputContent validData={validData} existsError={existsError}>
      <LabelText>{text}</LabelText>
      <TextInput
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeText={onChangeText}
      />
    </InputContent>
  );
};
