import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { inputFormatValue } from "../../../utils";
import { NewBetButton } from "../NewBetButton";

interface NewBetButtonFlatListProps {
  range: number;
  handleOnPressEvent: (value: string) => void;
  color: string;
  selectedNumbers: string[];
}

export const NewBetButtonFlatList = ({
  range,
  handleOnPressEvent,
  color,
  selectedNumbers,
}: NewBetButtonFlatListProps) => {
  const existsNumber = (value: number): boolean => {
    const checkNumbers = selectedNumbers.find(
      (values) => inputFormatValue(Number(values)) === inputFormatValue(value)
    );
    return checkNumbers ? true : false;
  };

  let numbers: string[] = [];
  for (let index = 1; index <= range; index++) {
    const formatValues = inputFormatValue(index);

    numbers.push(formatValues);
  }

  return (
    <FlatList
      data={numbers}
      keyExtractor={(number) => String(number)}
      numColumns={5}
      showsVerticalScrollIndicator={true}
      renderItem={({ item }) => (
        <NewBetButton
          onPress={() => handleOnPressEvent(String(item))}
          isActive={existsNumber(Number(item))}
          color={color}
          stringValue={String(item)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
});
