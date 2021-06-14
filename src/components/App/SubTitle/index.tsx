import React from "react";
import { ViewContainer, TextTitle, TextSubTitle } from "./styles";

interface SubTitlesProps {
  title: string;
  subtitle: string;
}

export const SubTitles = ({ subtitle, title }: SubTitlesProps) => (
  <ViewContainer>
    <TextTitle>{title}</TextTitle>
    <TextSubTitle>{subtitle}</TextSubTitle>
  </ViewContainer>
);
