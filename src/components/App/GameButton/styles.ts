import styled from "styled-components/native";

interface ButtonColorProps {
  color: string;
  isActive: boolean;
}

export const ContainerButton = styled.View<ButtonColorProps>`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;

  background: transparent;
  padding: 8px 16px;
  border-radius: 100px;

  margin-right: 8px;

  border: 2px solid ${(props) => props.color};

  background: ${(props) => (props.isActive ? props.color : "transparent")};
`;

export const TextDescription = styled.Text<ButtonColorProps>`
  color: ${(props) =>
    props.isActive ? props.theme.colors.white : props.color};
  text-align: center;
`;

export const TextActivy = styled.Text`
  position: absolute;
  right: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
`;
