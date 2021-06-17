import React from "react";
import { FlatList } from "react-native";
import { BetsInCart } from "../BetsInCart";
import { GameAddCart } from "../../../../@types/gameAddCart";

interface BetsFlatListProps {
  games: GameAddCart[];
  handleOnTrashPress: (id: string) => void;
}

export const BetsFlatCartList = ({
  games,
  handleOnTrashPress,
}: BetsFlatListProps) => {
  return (
    <FlatList
      data={games}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <BetsInCart
          numbers={item.gameNumbers}
          price={item.price}
          date={item.betDate}
          color={item.color}
          gameName={item.type}
          onTrashPress={() => {
            handleOnTrashPress(String(item.id));
          }}
        />
      )}
    />
  );
};
