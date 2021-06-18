import React, { useState, useEffect } from "react";
import { FlatList, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ViewNoGameThisType, TextNoGame } from "./styles";
import { BetInUserBets } from "../BetInUserBets";
import { BetApiResponse } from "../../../@types";
import { colors } from "../../../styles/colors";

interface BetsFlatListProps {
  games: BetApiResponse[];
  filtered?: string[];
}

export const BetsFlatList = ({ filtered, games }: BetsFlatListProps) => {
  const [filterBets, setFilterBets] = useState<BetApiResponse[]>([]);

  const handleFilteredBets = () => {
    if (filtered) {
      if (filtered.length === 0) setFilterBets(games);
      else {
        const filteredBet = games.filter((bet) =>
          filtered.includes(bet.game.type)
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
            date={item.updated_at}
            color={item.game.color}
            gameName={item.game.type}
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
        <TextNoGame> Vc nao possui jogos desse tipo.</TextNoGame>
      </ViewNoGameThisType>
    );
  }
};
