import styled from "styled-components/native";
import { Platform } from "react-native";

export const ViewContainer = styled.View`
  border: 4px solid ${({ theme }) => theme.colors.white};
  box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 60px;

  ${Platform.select({
    android: {
      shadowColor: "#000000",
      shadowOpacity: 0.25,
      shadowOffset: { width: 4, height: 6 },
      shadowRadius: 10,
      elevation: 3,
    },
  })}
`;

export const ViewNothing = styled.View``;
