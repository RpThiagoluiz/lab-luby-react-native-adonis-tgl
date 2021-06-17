import React from "react";
import moment from "moment";
import { formatNumberInArray, formatValues } from "../../../../utils";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  ViewContainer,
  ViewWrapper,
  BorderLeft,
  TextNumbers,
  TextDescription,
  TextGameName,
  ViewContentDataPriceDelete,
} from "./styles";
import { colors } from "../../../../styles/colors";
import { GestureResponderEvent } from "react-native";

interface betProps {
  numbers: any;
  color: string;
  date: Date;
  price: number;
  gameName: string;
  onTrashPress: (event: GestureResponderEvent) => void;
}

export const BetsInCart = ({
  numbers,
  color,
  date,
  price,
  gameName,
  onTrashPress,
}: betProps) => (
  <ViewContainer>
    <BorderLeft color={color}></BorderLeft>
    <ViewWrapper>
      <TextNumbers>{formatNumberInArray(numbers)}</TextNumbers>
      <ViewContentDataPriceDelete>
        <TextDescription>
          {moment(date).format("DD/MM/YYYY")} - ({formatValues(price)})
        </TextDescription>
        <FontAwesome5
          name="trash-alt"
          size={18}
          color={colors.gray_700}
          onPress={onTrashPress}
        />
      </ViewContentDataPriceDelete>

      <TextGameName color={color}>{gameName}</TextGameName>
    </ViewWrapper>
  </ViewContainer>
);
