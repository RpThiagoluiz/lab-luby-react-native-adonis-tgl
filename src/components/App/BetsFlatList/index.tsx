import React, { useState, useEffect } from "react";
import { FlatList, Text } from "react-native";
import { BetInUserBets } from "../BetInUserBets";
import { BetApiResponse, GameTypesProps } from "../../../@types";

interface BetsFlatListProps {
  games: BetApiResponse[];
  filter: GameTypesProps[];
}

export const BetsFlatList = ({ filter, games }: BetsFlatListProps) => {
  const [filterBets, setFilterBets] = useState<BetApiResponse[]>([]);

  const handleFilteredBets = () => {
    // if (filter.length === 0) {
    //   setFilterBets([...games]);
    // } else {
    //   const aux = games.filter((bet) => filter.includes(bet.game.type));
    //   setFilterBets([...aux]);
    // }
  };

  useEffect(() => {
    handleFilteredBets();
  }, [filter, games]);

  if (filterBets) {
    return (
      <FlatList
        data={games}
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
