import styled from "styled-components/native";

interface ColorProps {
  color: string;
}

export const ViewContainer = styled.View`
  margin-top: 15px;
  flex-direction: row;
`;
export const BorderLeft = styled.View<ColorProps>`
  width: 6px;
  height: auto;
  background-color: ${(props) => props.color};
  border-radius: 100px;
  margin-left: 15px;
`;

export const ViewWrapper = styled.View`
  padding: 0 8px;
`;
export const TextNumbers = styled.Text`
  color: ${({ theme }) => theme.colors.gray_800};
  font-size: 14px;
  font-style: italic;
  font-weight: bold;
`;
export const TextDescription = styled.Text`
  color: ${({ theme }) => theme.colors.gray_800};
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 8px;
`;
export const TextGameName = styled.Text<ColorProps>`
  color: ${(props) => props.color};
  font-size: 16px;
  font-style: italic;
  font-weight: bold;
`;
