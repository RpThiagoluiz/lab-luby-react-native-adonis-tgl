import React from "react";
import { InputContent, LabelText, TextInput } from "./styles";

interface InputWrapperProps {
  text: string;
}

export const InputWrapper = ({ text }: InputWrapperProps) => (
  <InputContent>
    <LabelText>{text}</LabelText>
    <TextInput />
  </InputContent>
);
