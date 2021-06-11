import styled from "styled-components/native";

interface ContainerProps {
  marginTop?: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  align-items: center;
  margin-top: ${({ marginTop }) => (!!marginTop ? marginTop : "80px")};
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.gray_700};
`;
