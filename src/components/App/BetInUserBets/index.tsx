import React from "react";
import moment from "moment";
import { formatValues } from "../../../utils";
import {
  ViewContainer,
  ViewWrapper,
  BorderLeft,
  TextNumbers,
  TextDescription,
  TextGameName,
  ViewContentDataPriceDelete,
} from "./styles";

interface betProps {
  numbers: string;
  color: string;
  date: Date;
  price: number;
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
      <ViewContentDataPriceDelete>
        <TextDescription>
          {date} - {price}
          {/* {moment(date).format("DD/MM/YYYY")} - ({formatValues(price)}) */}
        </TextDescription>
      </ViewContentDataPriceDelete>
      <TextGameName color={color}>{gameName}</TextGameName>
    </ViewWrapper>
  </ViewContainer>
);
