import React from "react";
import { FlatList } from "react-native";
import { GameTypesProps } from "../../../@types";
import { GameButton } from "../GameButton";

interface GameModFlatListProps {
  games: GameTypesProps[];
  gameChoice?: GameTypesProps;
  filteredGames?: string[];
  handleOnPressEvent: (gameType: string) => void;
}

export const GameModFlatList = ({
  games,
  filteredGames,
  gameChoice,
  handleOnPressEvent,
}: GameModFlatListProps) => {
  return (
    <FlatList
      data={games}
      keyExtractor={(item) => String(item.id)}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <GameButton
          isActive={
            filteredGames
              ? filteredGames.indexOf(item.type) !== -1
              : gameChoice
              ? gameChoice.type === item.type
              : false
          }
          onPress={() => handleOnPressEvent(item.type)}
          color={item.color}
          gameName={item.type}
        />
      )}
    />
  );
};
