import styled from "styled-components/native";
import { Platform } from "react-native";

export const ViewContainer = styled.View`
  height: 120px;
  background-color: ${({ theme }) => theme.colors.white};
  ${Platform.select({
    android: {
      height: 110,
    },
  })}
`;

export const ViewContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${Platform.select({
    android: {
      marginTop: 40,
      marginHorizontal: 20,
    },
    ios: {
      marginTop: 50,
      marginHorizontal: 20,
    },
  })}
`;

export const TextTitle = styled.Text`
  font-size: 36px;
  font-weight: bold;
  font-style: italic;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.gray_700};
`;

export const ViewWrapper = styled.View``;

export const AfterTitle = styled.View`
  border: 4px solid ${({ theme }) => theme.colors.yellow_green};
  width: 100px;
  border-radius: 6px;
  margin-bottom: 50px;
`;
