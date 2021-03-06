import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Alert, FlatList } from "react-native";
import {
  TextDescription,
  TextStrongDescription,
  ViewDescriptionContainer,
  ViewContainerNumbers,
  ViewBetActionContainer,
} from "./styles/NewBetsStyles";
import { useDispatch } from "react-redux";
import { AppHeader } from "../../components/App/Header";
import { api } from "../../services/api";
import { SubTitles } from "../../components/App/SubTitle";
import { AppContainer } from "../../components/App/Container";
import { ServerOff } from "../../components/App/ServerOff";
import { LoadingActivyIndicator } from "../../components/App/LoadingActivyIndicator";
import { GameModFlatList } from "../../components/App/GameModFlatList";
import { GameTypesProps, GameAddCart } from "../../@types";
import { NewBetButtonFlatList } from "../../components/App/NewBetButtonFlatList";
import { NewBetButton } from "../../components/App/NewBetButton";
import { BetActionButton } from "../../components/App/BetActionButton";
import { inputFormatValue } from "../../utils";
import { addCartItem } from "../../store/actions/betCartActions";
import { useAppSelector } from "../../store/typedUse";

//Salvar o game inicial

export const NewBets = () => {
  const [games, setGames] = useState<GameTypesProps[]>([]);
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
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);

  const cartItems = useAppSelector((state) => state.cart.games);
  const dispatch = useDispatch();

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
      try {
        const indexSelected = selectedNumbers.indexOf(value);
        const numExists = indexSelected === -1;

        if (numExists && selectedNumbers.length < gameSelected["max-number"]) {
          return setSelectedNumbers((prevState) => [...prevState, value]);
        } else if (!numExists) {
          const filterNumbers = selectedNumbers.filter((num) => num !== value);
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

  const handlerClearSelectedNumbers = () => {
    return setSelectedNumbers([]);
  };

  const handlerCompleteGame = useCallback(() => {
    setSelectedNumbers([]);
    const { range } = gameSelected;
    let selectArray: string[] = [];
    const numbersForCompleted =
      gameSelected["max-number"] - selectedNumbers.length;

    try {
      if (selectedNumbers.length >= gameSelected["max-number"]) {
        throw new Error(`Numeros maximo atingido`);
      } else {
        while (selectArray.length < numbersForCompleted) {
          const randomNumber = inputFormatValue(
            Math.ceil(Math.random() * range)
          );
          if (
            selectArray.indexOf(randomNumber) === -1 &&
            selectedNumbers.indexOf(randomNumber) === -1
          ) {
            selectArray.push(randomNumber);
          }
        }

        setSelectedNumbers((prevState) => [...prevState, ...selectArray]);
      }
    } catch (error) {
      Alert.alert(
        `Para o game ${gameSelected.type}`,
        `A quantidade maxima ?? ${gameSelected["max-number"]}`
      );
    }
  }, [gameSelected, gameSelected]);

  const handleAddCart = () => {
    try {
      const { type, price, color, id } = gameSelected;
      const numbersChoice = [...selectedNumbers].map((el) => Number(el));

      if (numbersChoice.length !== gameSelected["max-number"]) {
        throw new Error(
          `Voce nao adicionou a quantidade de numeros do game , ${gameSelected.type} , ${gameSelected["max-number"]}`
        );
      }

      const newCartGame: GameAddCart = {
        game_id: id,
        id: String(new Date().getTime()),
        type,
        gameNumbers: numbersChoice,
        price,
        betDate: new Date(),
        color,
      };

      dispatch(addCartItem(newCartGame));

      setSelectedNumbers([]);
    } catch (error) {
      Alert.alert(
        `Error ????`,
        `Voce nao adicionou a quantidade de numeros do game , ${gameSelected.type} , ${gameSelected["max-number"]}`
      );
    }
  };

  const existsNumber = (value: number): boolean => {
    const checkNumbers = selectedNumbers.find(
      (values) => inputFormatValue(Number(values)) === inputFormatValue(value)
    );
    return checkNumbers ? true : false;
  };

  useEffect(() => {
    let mounted = true;
    const getGames = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get<GameTypesProps[]>(`/game`);

        const findLotofacil = data.filter((game) => game.type === "Lotof??cil");
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
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader
        haveCart={selectedNumbers.length > 0 || cartItems.length > 0}
      />

      {isLoading ? (
        <LoadingActivyIndicator />
      ) : serverOff ? (
        <ServerOff />
      ) : (
        <View>
          <AppContainer>
            <SubTitles
              title={`New Bet for ${gameSelected.type} `}
              subtitle="Choose a game"
            />

            <GameModFlatList
              games={games}
              gameChoice={gameSelected}
              handleOnPressEvent={handleGameChoice}
            />

            {selectedNumbers.length ? (
              <View>
                <ViewBetActionContainer>
                  <FlatList
                    data={selectedNumbers}
                    keyExtractor={(number) => String(number)}
                    numColumns={7}
                    renderItem={({ item }) => (
                      <NewBetButton
                        size="40px"
                        fontSize="15px"
                        onPress={() => {}}
                        isActive={existsNumber(Number(item))}
                        color={gameSelected.color}
                        stringValue={inputFormatValue(Number(item))}
                      />
                    )}
                  />
                </ViewBetActionContainer>

                <ScrollView horizontal={true}>
                  <ViewBetActionContainer>
                    <BetActionButton
                      text="Complete game"
                      onPress={handlerCompleteGame}
                    />
                    <BetActionButton
                      text="Clear game"
                      onPress={handlerClearSelectedNumbers}
                    />
                    <BetActionButton
                      isAddCart={true}
                      text="Add to cart"
                      onPress={handleAddCart}
                    />
                  </ViewBetActionContainer>
                </ScrollView>
              </View>
            ) : (
              <ViewDescriptionContainer>
                <TextStrongDescription>Fill your bet</TextStrongDescription>
                <TextDescription>{gameSelected.description}</TextDescription>
              </ViewDescriptionContainer>
            )}
          </AppContainer>

          <ViewContainerNumbers>
            <NewBetButtonFlatList
              range={gameSelected.range}
              handleOnPressEvent={handleNumberValue}
              color={gameSelected.color}
              selectedNumbers={selectedNumbers}
            />
          </ViewContainerNumbers>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
