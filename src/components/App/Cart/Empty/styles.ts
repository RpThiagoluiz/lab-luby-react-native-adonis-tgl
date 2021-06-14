import styled from "styled-components/native";

export const ViewContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TextDescription = styled.Text`
  margin-top: 40px;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray_700};
`;
