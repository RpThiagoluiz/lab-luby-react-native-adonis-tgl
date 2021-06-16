import styled from "styled-components/native";

export const ViewDescriptionContainer = styled.View`
  margin: 15px 0;
`;

export const TextStrongDescription = styled.Text`
  font-weight: bold;
  font-style: italic;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray_800};
  margin-bottom: 10px;
`;

export const TextDescription = styled.Text`
  color: ${({ theme }) => theme.colors.gray_800};
`;
export const ViewBetActionContainer = styled.View`
  margin: 15px 0;
  flex-direction: row;
`;

export const ViewContainerNumbers = styled.View`
  height: 260px;
  background: transparent;
  margin: 3px 15px 30px 15px;
`;
