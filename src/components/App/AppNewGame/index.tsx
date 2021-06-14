import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { AppHeader } from "../AppHeader";
import { api } from "../../../services/api";
import { SubTitles } from "../SubTitle";
import { AppContainer } from "../AppContainer";
import { GameButton } from "../GameButton";

export const AppNewGame = () => {
  const [games, setGames] = useState<any[]>([]);
  const [gameSelected, setGameSelected] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGames = async () => {
      try {
        const { data } = await api.get(`/game`);
        setIsLoading(false);
        setGames(data);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getGames();
  }, []);
  return (
    <View style={styles.container}>
      <AppHeader />
      <AppContainer>
        <SubTitles title={`New Bet for lotomonia `} subtitle="Choose a game" />
        <FlatList
          data={games}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameButton
              isActive={false}
              onPress={() => console.log(item.type)}
              color={item.color}
              gameName={item.type}
            />
          )}
        />
      </AppContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
