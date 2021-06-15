import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { api } from "../../../services/api";
import { AppHeader } from "../AppHeader";
import { EmptyCart } from "../Cart/Empty";
import { BetInUserBets } from "../BetInUserBets";
import { SubTitles } from "../SubTitle";
import { AppContainer } from "../AppContainer";
import { GameButton } from "../GameButton";
import { ServerOff } from "../ServerOff";
import { LoadingActivyIndicator } from "../LoadingActivyIndicator";

export const AppHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<any>();
  const [userBets, setUserBets] = useState<any>(); //Remove Any
  const [filteredGames, setFilteredGames] = useState<string[]>([]);
  const [serverOff, setServerOff] = useState(false);
  const [loadInfo, setLoadInfo] = useState(false);

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

    setIsLoading(false);
    getGames();
    return () => {
      mounted = false;
    };
  }, [loadInfo]);

  const handlefilteredGames = (name: string) => {
    //if have no filtered game, show all else just filtered
    const find = filteredGames.find((el) => el === name);

    if (find) {
      const games = [...filteredGames];
      const filter = games.filter((el) => el !== name);

      setFilteredGames(filter);
    } else {
      setFilteredGames((prevState) => [...prevState, name]);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader />

      {isLoading ? (
        <LoadingActivyIndicator />
      ) : (
        <AppContainer>
          <SubTitles title="Recent Games" subtitle="Filters" />
          {serverOff && <ServerOff />}

          <FlatList
            data={games}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gameFlatList}
            renderItem={({ item }) => (
              <GameButton
                isActive={filteredGames.indexOf(item.type) !== -1}
                onPress={() => handlefilteredGames(item.type)}
                color={item.color}
                gameName={item.type}
              />
            )}
          />
        </AppContainer>
      )}
      {userBets && userBets.length === 0 ? (
        <EmptyCart />
      ) : (
        <FlatList
          data={userBets}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.betsFlatList}
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
