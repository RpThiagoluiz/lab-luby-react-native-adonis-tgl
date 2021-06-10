import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppHeader } from "../AppHeader";

export const AppAccount = () => {
  return (
    <View style={styles.container}>
      <AppHeader />
      <Text>AppAccount!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
