import styled from "styled-components/native";

interface ButtonColorProps {
  color: string;
  isActive: boolean;
  size?: string;
}

export const ContainerButton = styled.View<ButtonColorProps>`
  justify-content: center;
  width: ${({ size }) => (size ? size : "60px")};
  height: ${({ size }) => (size ? size : "60px")};

  background: transparent;

  border-radius: 60px;

  margin: 4px;

  border: none;

  background: ${(props) =>
    props.isActive ? props.color : props.theme.colors.cyan_gray};
`;

export const TextValue = styled.Text<ButtonColorProps>`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-size: 20px;
`;
