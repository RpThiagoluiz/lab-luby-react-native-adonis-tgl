import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppHeader } from "../AppHeader";
import { useAuth } from "../../../hook/authContext";
import { api } from "../../../services/api";

export const AppNewGame = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGames = async () => {
      try {
        const { data } = await api.get(`/game`);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getGames();
  }, []);
  return (
    <View style={styles.container}>
      <AppHeader />
      <Text>AppNewGame!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
