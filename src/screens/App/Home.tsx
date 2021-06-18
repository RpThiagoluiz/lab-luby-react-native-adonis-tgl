import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { api } from "../../services/api";
import { AppHeader } from "../../components/App/Header";
import { EmptyCart } from "../../components/App/Cart/Empty";
import { SubTitles } from "../../components/App/SubTitle";
import { AppContainer } from "../../components/App/Container";
import { ServerOff } from "../../components/App/ServerOff";
import { LoadingActivyIndicator } from "../../components/App/LoadingActivyIndicator";
import { BetsFlatList } from "../../components/App/BetsFlatList";
import { BetApiResponse } from "../../@types";
import { GameModFlatList } from "../../components/App/GameModFlatList";
import { useAppSelector } from "../../store/typedUse";

export const AppHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<any>();
  const [userBets, setUserBets] = useState<BetApiResponse[]>([]); //Remove Any
  const [filteredGames, setFilteredGames] = useState<string[]>([]);
  const [serverOff, setServerOff] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.games);

  const handlefilteredGames = (name: string) => {
    const find = filteredGames.find((el) => el === name);

    if (find) {
      const filterGames = filteredGames.filter((el) => el !== name);
      setFilteredGames(filterGames);
    } else {
      setFilteredGames((prevState) => [...prevState, name]);
    }
  };

  const getGames = async () => {
    try {
      setIsLoading(true);
      const { data: dataGame } = await api.get("/game");
      const { data: dataBets } = await api.get("/bets");

      setGames(dataGame);
      setUserBets(dataBets);
      setIsLoading(false);
    } catch (error) {
      setServerOff(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <AppHeader />

      {isLoading ? (
        <LoadingActivyIndicator />
      ) : (
        <AppContainer>
          <SubTitles title="Recent Games" subtitle="Filters" />
          {serverOff && <ServerOff />}

          <GameModFlatList
            games={games}
            filteredGames={filteredGames}
            handleOnPressEvent={handlefilteredGames}
          />
        </AppContainer>
      )}
      {userBets && userBets.length === 0 ? (
        <EmptyCart text="Vamos realizar seu primeiro Jogo! Corra e nao perca a chance de mudar de vida 🎉🎉" />
      ) : (
        <BetsFlatList filtered={filteredGames} games={userBets} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
