import styled from "styled-components/native";

export const ViewContainer = styled.View`
  margin-top: 100px;
  align-items: center;
  justify-content: center;
`;

export const TextDescription = styled.Text`
  color: ${({ theme }) => theme.colors.gray_900};
  margin-top: 20px;
  font-weight: bold;
  padding: 15px;
`;
