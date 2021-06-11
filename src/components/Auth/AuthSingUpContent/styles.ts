import styled from "styled-components/native";
import { Platform } from "react-native";

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  position: relative;
  ${Platform.select({
    android: {
      marginTop: 50,
    },
    ios: {
      marginTop: 30,
    },
  })}
`;

export const ViewContent = styled.View`
  width: 100%;
`;

export const ViewWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TextTitle = styled.Text`
  font-size: 44px;
  font-style: italic;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_700};
  text-align: center;
`;
export const TextSubTitle = styled.Text`
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  color: ${({ theme }) => theme.colors.gray_700};
`;
