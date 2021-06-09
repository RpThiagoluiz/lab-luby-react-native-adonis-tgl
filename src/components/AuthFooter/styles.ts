import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 40;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.gray_700};
`;
