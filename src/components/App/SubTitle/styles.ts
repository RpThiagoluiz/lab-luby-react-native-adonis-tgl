import styled from "styled-components/native";

export const ViewContainer = styled.View``;

export const TextTitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray_700};
  font-size: 24px;
  font-weight: bold;
  font-style: italic;

  text-transform: uppercase;
`;
export const TextSubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray_800};
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 12px;
`;
