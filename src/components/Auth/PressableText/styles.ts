import styled from "styled-components/native";

interface TextFontSizeProps {
  color: string;
  IsIconLeft: boolean;
}

export const ViewContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 24px 16px;
`;

export const Text = styled.Text<TextFontSizeProps>`
  font-size: 32px;
  color: ${(props) => props.color};
  font-weight: bold;
  font-style: italic;

  ${({ IsIconLeft }) =>
    IsIconLeft ? "margin-left: 14px" : "margin-right: 14px"}
`;
