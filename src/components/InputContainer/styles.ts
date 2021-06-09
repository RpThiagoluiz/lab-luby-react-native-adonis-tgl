import styled from "styled-components/native";
import { Platform } from "react-native";

export const ContainerView = styled.View`
  margin: 25px;
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.shape};
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;

export const FormContent = styled.View`
  border-color: ${({ theme }) => theme.colors.shape};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
`;

export const InputContent = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.shape};
`;

export const PasswordWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LabelText = styled.Text`
  color: ${({ theme }) => theme.colors.gray_300};
  font-family: HelveticaItalic;

  margin: 34px 0 26px 30px;
`;

export const TextInput = styled.TextInput`
  margin-left: 26px;
  font-size: 20px;
`;

export const PassIconWrapper = styled.View`
  margin-right: 26px;
`;

export const ForgotPassWrapper = styled.View`
  align-items: flex-end;
`;

export const ForgotPass = styled.Text`
  color: ${({ theme }) => theme.colors.gray_100};
  padding: 26px;
`;

export const LogInWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 24px 16px;
`;
