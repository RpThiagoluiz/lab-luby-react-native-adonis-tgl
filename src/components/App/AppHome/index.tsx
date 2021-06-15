import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { api } from "../../../services/api";
import { AppHeader } from "../AppHeader";
import { EmptyCart } from "../Cart/Empty";
import { SubTitles } from "../SubTitle";
import { AppContainer } from "../AppContainer";
import { GameButton } from "../GameButton";
import { ServerOff } from "../ServerOff";
import { LoadingActivyIndicator } from "../LoadingActivyIndicator";
import { BetsFlatList } from "../BetsFlatList";
import { BetApiResponse } from "../../../@types";
import { GameModFlatList } from "../GameModFlatList";

export const AppHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<any>();
  const [userBets, setUserBets] = useState<BetApiResponse[]>([]); //Remove Any
  const [filteredGames, setFilteredGames] = useState<string[]>([]);
  const [serverOff, setServerOff] = useState(false);
  const [loadInfo, setLoadInfo] = useState(false);

  const handlefilteredGames = (name: string) => {
    const find = filteredGames.find((el) => el === name);

    if (find) {
      const filterGames = filteredGames.filter((el) => el !== name);
      setFilteredGames(filterGames);
    } else {
      setFilteredGames((prevState) => [...prevState, name]);
    }
  };

  useEffect(() => {
    //Monitorar
    let mounted = true;
    const getGames = async () => {
      setIsLoading(true);

      try {
        const { data: dataGame } = await api.get("/game");
        const { data: dataBets } = await api.get("/bets");

        if (mounted) {
          setGames(dataGame);
          setUserBets(dataBets);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setServerOff(true);
        setIsLoading(false);
      }
    };
    //fectchBets();
    getGames();
    setIsLoading(false);
    return () => {
      mounted = false;
    };
  }, [loadInfo]);

  useEffect(() => {
    console.log(filteredGames);
  }, [filteredGames]);

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
        <EmptyCart />
      ) : (
        <BetsFlatList filter={[]} games={userBets} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameFlatList: {},
  betsFlatList: {},
});
