import React, { useState, useEffect } from "react";
import { FlatList, GestureResponderEvent, Text } from "react-native";
import { BetInUserBets } from "../BetInUserBets";
import { BetApiResponse } from "../../../@types";
import { GameAddCart } from "../../../@types/gameAddCart";

interface BetsFlatListProps {
  games: BetApiResponse[];
  filtered?: string[];
  inCart?: boolean;
  handleOnTrashPress?: (id: string) => void;
}

export const BetsFlatList = ({
  filtered,
  games,
  inCart,
  handleOnTrashPress,
}: BetsFlatListProps) => {
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
    return <Text> Vc nao possui jogos desse tipo.</Text>;
  }
};
