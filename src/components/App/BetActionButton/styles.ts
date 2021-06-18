import styled from "styled-components/native";

interface addCart {
  isAddCart?: boolean;
}

export const ViewContiner = styled.View<addCart>`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 120px;
  height: 40px;

  background: ${(props) =>
    props.isAddCart ? props.theme.colors.yellow_green : "transparent"};
  padding: 8px;
  border-radius: 10px;

  margin-right: 8px;

  border: 2px solid ${(props) => props.theme.colors.yellow_green};
`;

export const Text = styled.Text<addCart>`
  font-size: 12px;
  color: ${(props) =>
    props.isAddCart
      ? props.theme.colors.white
      : props.theme.colors.yellow_green};
  font-weight: bold;
`;
