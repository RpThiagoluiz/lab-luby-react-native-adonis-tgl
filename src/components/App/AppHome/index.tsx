import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { api } from "../../../services/api";

import { AppHeader } from "../AppHeader";

export const AppHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userBets, setUserBets] = useState<any>();

  useEffect(() => {
    async function getBets() {
      setIsLoading(true);
      try {
        const { data } = await api.get("/bets");
        console.log(data);

        setIsLoading(false);
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
    getBets();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader />
      {isLoading ? <Text>Find bets...</Text> : <Text>is Here</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
