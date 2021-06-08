import styled from "styled-components/native";

export const SafeAreaView = styled.SafeAreaView`
  align-items: center;
  margin: 25px;
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.shape};
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  align-items: center;
  margin: 25px;
  border-color: ${({ theme }) => theme.colors.shape};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
`;

export const FormContent = styled.View``;

export const InputContent = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.shape};
`;
