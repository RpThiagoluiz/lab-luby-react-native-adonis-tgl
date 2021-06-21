import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ViewNoGameThisType, TextNoGame } from "./styles";
import { BetInUserBets } from "../BetInUserBets";
import { betProps } from "../../../@types";
import { colors } from "../../../styles/colors";

interface BetsFlatListProps {
  games: betProps[];
  filtered?: string[];
}

export const BetsFlatList = ({ filtered, games }: BetsFlatListProps) => {
  const [filterBets, setFilterBets] = useState<betProps[]>([]);

  const handleFilteredBets = () => {
    if (filtered) {
      if (filtered.length === 0) setFilterBets(games);
      else {
        const filteredBet = games.filter((bet) =>
          filtered.includes(bet.gameName)
        );

        setFilterBets(filteredBet);
      }
    } else {
      setFilterBets(games);
    }
  };

  useEffect(() => {
    handleFilteredBets();
  }, [filtered, games]);

  if (filterBets.length > 0) {
    return (
      <FlatList
        data={filterBets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <BetInUserBets
            numbers={item.numbers}
            price={item.price}
            date={item.date}
            color={item.color}
            gameName={item.gameName}
          />
        )}
      />
    );
  } else {
    return (
      <ViewNoGameThisType>
        <MaterialCommunityIcons
          name="slot-machine-outline"
          size={40}
          color={colors.red}
        />
        <TextNoGame> Vc não possui jogos desse tipo.</TextNoGame>
      </ViewNoGameThisType>
    );
  }
};
