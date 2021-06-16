import React, { useState, useEffect } from "react";
import { FlatList, Text, ScrollView } from "react-native";
import { BetInUserBets } from "../BetInUserBets";
import { BetApiResponse, GameTypesProps } from "../../../@types";
import { dateFormatValue } from "../../../utils";

interface BetsFlatListProps {
  games: BetApiResponse[];
  filtered: string[];
}

export const BetsFlatList = ({ filtered, games }: BetsFlatListProps) => {
  const [filterBets, setFilterBets] = useState<BetApiResponse[]>([]);

  const handleFilteredBets = () => {
    if (filtered.length === 0) setFilterBets(games);
    else {
      const filteredBet = games.filter((bet) =>
        filtered.includes(bet.game.type)
      );

      console.log(`filter: ${filtered}`);

      setFilterBets(filteredBet);
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
    return <Text> NO GAMES this type</Text>;
  }
};
