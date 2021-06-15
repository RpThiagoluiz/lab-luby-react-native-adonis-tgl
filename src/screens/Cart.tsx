import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const Cart = () => (
  <View style={styles.container}>
    <Text>Cart Route</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
