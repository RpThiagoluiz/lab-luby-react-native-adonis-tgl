import styled from "styled-components/native";

export const ViewContainer = styled.View`
  flex: 1;
`;

export const ViewWrapper = styled.View`
  margin-top: 10px;
`;

export const ViewWrapperData = styled.View`
  align-items: center;
`;

export const TextData = styled.Text`
  color: ${({ theme }) => theme.colors.gray_300};
  font-size: 14px;
  line-height: 18px;
`;
