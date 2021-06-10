import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { useAuth } from "../../../hook/authContext";
import { AppHeader } from "../AppHeader";

export const AppHome = () => {
  const { signOut, findToken } = useAuth();

  useEffect(() => {
    console.log(findToken);
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader />
      <Text>LOGADO!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
