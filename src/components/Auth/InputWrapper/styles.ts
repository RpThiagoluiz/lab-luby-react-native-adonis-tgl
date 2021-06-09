import styled from "styled-components/native";

interface InputContent {
  validData?: boolean;
}

export const InputContent = styled.View<InputContent>`
  border-bottom-width: 1px;
  border-color: ${({ theme, validData }) =>
    validData ? theme.colors.yellow_green : theme.colors.shape};
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
