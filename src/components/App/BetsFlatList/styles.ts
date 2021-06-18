import styled from "styled-components/native";
import { Platform } from "react-native";

export const ViewNoGameThisType = styled.View`
  height: 150px;

  margin: 50px;
  padding: 5px;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.colors.shape};
  box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  ${Platform.select({
    android: {
      shadowColor: "#000000",
      shadowOpacity: 0.25,
      shadowOffset: { width: 2, height: 4 },
      shadowRadius: 10,
      elevation: 3,
    },
  })}
`;

export const TextNoGame = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_700};
  text-align: center;
`;
