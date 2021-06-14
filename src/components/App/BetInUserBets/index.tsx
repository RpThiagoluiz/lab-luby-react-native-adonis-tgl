import React from "react";
import { dateFormatValue, formatValues } from "../../../utils";
import {
  ViewContainer,
  ViewWrapper,
  BorderLeft,
  TextNumbers,
  TextDescription,
  TextGameName,
} from "./styles";

interface betProps {
  numbers: string;
  color: string;
  date: Date;
  price: string;
  gameName: string;
}

export const BetInUserBets = ({
  numbers,
  color,
  date,
  price,
  gameName,
}: betProps) => (
  <ViewContainer>
    <BorderLeft color={color}></BorderLeft>
    <ViewWrapper>
      <TextNumbers>{numbers}</TextNumbers>
      <TextDescription>
        {date} - ({formatValues(price)})
      </TextDescription>
      <TextGameName color={color}>{gameName}</TextGameName>
    </ViewWrapper>
  </ViewContainer>
);
