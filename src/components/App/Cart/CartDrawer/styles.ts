import styled from "styled-components/native";

export const ViewContainer = styled.View`
  width: 100%;
  height: 100%;

  position: relative;
`;

export const ViewClosedContainer = styled.View`
  margin-top: 15px;
  position: relative;
`;

export const ViewHeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
`;

export const TextHeader = styled.Text`
  font-weight: bold;
  font-size: 36px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.gray_700};
  margin-left: 10px;
`;

export const ViewWrapperFlatList = styled.View`
  height: 400px;

  margin-right: 10px;
`;

export const ViewWrapperSaveButton = styled.View`
  position: absolute;
  bottom: -100px;

  width: 120%;
  height: 100px;
  margin-top: 60px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const ViewCartTotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ViewCartTotalText = styled.View`
  flex-direction: row;
`;

export const TextStrong = styled.Text`
  font-weight: bold;
  font-style: italic;
  color: ${({ theme }) => theme.colors.gray_700};
`;
export const TextItalic = styled.Text`
  color: ${({ theme }) => theme.colors.gray_700};
`;
export const TextPrice = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_700};
`;
