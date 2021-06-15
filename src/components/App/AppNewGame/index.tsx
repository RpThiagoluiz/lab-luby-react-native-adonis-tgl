import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Alert, Text } from "react-native";
import {
  TextDescription,
  TextStrongDescription,
  ViewDescriptionContainer,
  ViewContainerNumbers,
  ViewBetActionContainer,
} from "./styles";
import { AppHeader } from "../AppHeader";
import { api } from "../../../services/api";
import { SubTitles } from "../SubTitle";
import { AppContainer } from "../AppContainer";
import { ServerOff } from "../ServerOff";
import { LoadingActivyIndicator } from "../LoadingActivyIndicator";
import { GameModFlatList } from "../GameModFlatList";
import { GameTypesProps } from "../../../@types";
import { NewBetButtonFlatList } from "../NewBetButtonFlatList";
import { BetActionButton } from "../BetActionButton";

//Salvar o game inicial

export const AppNewGame = () => {
  const [games, setGames] = useState<any[]>([]);
  const [gameSelected, setGameSelected] = useState<GameTypesProps>({
    id: 0,
    type: "",
    description: "",
    range: 0,
    price: 0,
    ["max-number"]: 0,
    color: "",
    ["min-cart-value"]: 0,
    created_at: new Date(),
    updated_at: new Date(),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [serverOff, setServerOff] = useState(false);
  const [loadInfo, setLoadInfo] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);

  const handleGameChoice = (gameType: string) => {
    setIsLoading(true);
    setSelectedNumbers([]);
    const result = games.filter((game) => game.type === gameType);
    const gameChoice = [...result];

    setGameSelected(gameChoice[0]);
    setIsLoading(false);
  };

  const handleNumberValue = useCallback(
    (value: string) => {
      const newValue = value;
      console.log(value);

      try {
        const indexSelected = selectedNumbers.indexOf(newValue);
        const numExists = indexSelected === -1;

        if (numExists && selectedNumbers.length < gameSelected["max-number"]) {
          return setSelectedNumbers((prevState) => [...prevState, newValue]);
        } else if (!numExists) {
          const filterNumbers = selectedNumbers.filter(
            (num) => num !== newValue
          );
          return setSelectedNumbers(filterNumbers);
        } else {
          throw new Error(
            `Quantidade selecionada, excede a quantidade maxima ${gameSelected["max-number"]}`
          );
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    },
    [selectedNumbers, gameSelected]
  );

  useEffect(() => {
    let mounted = true;
    const getGames = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get<GameTypesProps[]>(`/game`);

        const findLotofacil = data.filter((game) => game.type === "Lotofácil");
        const initalGame = [...findLotofacil];

        if (mounted) {
          setIsLoading(false);
          setGames(data);
          setGameSelected(initalGame[0]);
        }
      } catch (error) {
        setIsLoading(false);
        setServerOff(true);
      }
    };
    getGames();
    return () => {
      mounted = false;
    };
  }, [loadInfo]);

  return (
    <View style={styles.container}>
      <AppHeader haveCart={selectedNumbers.length > 0} />

      <ScrollView>
        {isLoading ? (
          <LoadingActivyIndicator />
        ) : (
          <AppContainer>
            <SubTitles
              title={`New Bet for ${gameSelected.type} `}
              subtitle="Choose a game"
            />
            {serverOff && <ServerOff />}

            <GameModFlatList
              games={games}
              gameChoice={gameSelected}
              handleOnPressEvent={handleGameChoice}
            />

            {selectedNumbers.length ? (
              <ScrollView horizontal={true}>
                <ViewBetActionContainer>
                  <BetActionButton text="Complete game" onPress={() => {}} />
                  <BetActionButton text="Clear game" onPress={() => {}} />
                  <BetActionButton
                    isAddCart={true}
                    text="Add to cart"
                    onPress={() => {}}
                  />
                </ViewBetActionContainer>
              </ScrollView>
            ) : (
              <ViewDescriptionContainer>
                <TextStrongDescription>Fill your bet</TextStrongDescription>
                <TextDescription>{gameSelected.description}</TextDescription>
              </ViewDescriptionContainer>
            )}

            <ViewContainerNumbers>
              <NewBetButtonFlatList
                range={gameSelected.range}
                handleOnPressEvent={handleNumberValue}
                color={gameSelected.color}
                selectedNumbers={selectedNumbers}
              />
            </ViewContainerNumbers>
          </AppContainer>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
