import React from "react";
import moment from "moment";
import { formatValues } from "../../../utils";
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
import { colors } from "../../../styles/colors";
import { GestureResponderEvent } from "react-native";

interface betProps {
  numbers: string;
  color: string;
  date: Date;
  price: number;
  gameName: string;
  inCart?: boolean;
  onTrashPress?: (event: GestureResponderEvent) => void;
}

export const BetInUserBets = ({
  numbers,
  color,
  date,
  price,
  gameName,
  inCart,
  onTrashPress,
}: betProps) => (
  <ViewContainer>
    <BorderLeft color={color}></BorderLeft>
    <ViewWrapper>
      <TextNumbers>{numbers}</TextNumbers>
      <ViewContentDataPriceDelete>
        <TextDescription>
          {moment(date).format("DD/MM/YYYY")} - ({formatValues(price)})
        </TextDescription>
        {inCart && (
          <FontAwesome5
            name="trash-alt"
            size={18}
            color={colors.gray_700}
            style={{ marginLeft: 80 }}
            onPress={onTrashPress}
          />
        )}
      </ViewContentDataPriceDelete>

      <TextGameName color={color}>{gameName}</TextGameName>
    </ViewWrapper>
  </ViewContainer>
);
