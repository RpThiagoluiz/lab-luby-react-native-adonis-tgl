import styled from "styled-components/native";

export const InputContent = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.shape};
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

export const PasswordWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
