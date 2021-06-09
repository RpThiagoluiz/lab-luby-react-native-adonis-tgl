import styled from "styled-components/native";

export const ContainerView = styled.View`
  margin: 25px;
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.shape};
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;

export const FormContent = styled.View`
  border-color: ${({ theme }) => theme.colors.shape};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
`;
