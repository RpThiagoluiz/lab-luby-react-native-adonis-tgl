import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: 30px;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.gray_700};
`;
