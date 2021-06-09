import React from "react";

import { InputContent, LabelText, TextInput } from "./styles";

interface InputWrapperProps {
  text: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onChangeText?: (value: string) => void;
  validData?: boolean;
}

export const InputWrapper = ({
  text,
  onBlur,
  onFocus,
  onChangeText,
  validData,
}: InputWrapperProps) => {
  return (
    <InputContent validData={validData}>
      <LabelText>{text}</LabelText>
      <TextInput
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeText={onChangeText}
      />
    </InputContent>
  );
};
