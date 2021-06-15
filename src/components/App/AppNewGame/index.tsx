import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AppHeader } from "../AppHeader";
import { api } from "../../../services/api";
import { SubTitles } from "../SubTitle";
import { AppContainer } from "../AppContainer";
import { GameButton } from "../GameButton";
import { ServerOff } from "../ServerOff";
import { colors } from "../../../styles/colors";
import { LoadingActivyIndicator } from "../LoadingActivyIndicator";
import { GameModFlatList } from "../GameModFlatList";

//Salvar o game inicial

export const AppNewGame = () => {
  const [games, setGames] = useState<any[]>([]);
  const [gameSelected, setGameSelected] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverOff, setServerOff] = useState(false);
  const [loadInfo, setLoadInfo] = useState(false);

  const handleGameChoice = (gameType: string) => {
    console.log(gameType);
  };

  useEffect(() => {
    let mounted = true;
    const getGames = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/game`);
        if (mounted) {
          setIsLoading(false);
          setGames(data);
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
      <AppHeader />

      {isLoading ? (
        <LoadingActivyIndicator />
      ) : (
        <AppContainer>
          <SubTitles
            title={`New Bet for lotomonia `}
            subtitle="Choose a game"
          />
          {serverOff && <ServerOff />}

          <GameModFlatList
            games={games}
            handleOnPressEvent={handleGameChoice}
          />
          {/* <FlatList
            data={games}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <GameButton
                isActive={false}
                onPress={() => console.log(item)}
                color={item.color}
                gameName={item.type}
              />
            )}
          /> */}
        </AppContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
