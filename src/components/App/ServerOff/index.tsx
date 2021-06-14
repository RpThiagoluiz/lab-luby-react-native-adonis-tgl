import React from "react";
import { ViewContainer, TextDescription } from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";

export const ServerOff = () => (
  <ViewContainer>
    <FontAwesome5 name="tools" size={80} color={colors.red} />
    <TextDescription>
      ⚒ 👷‍♂️Estamos em manutencao, por favor retorne mais tarde!
    </TextDescription>
  </ViewContainer>
);
