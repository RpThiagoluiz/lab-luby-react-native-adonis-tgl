import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ResetPassword = () => {
  return (
    <View style={styles.container}>
      <Text>ResetPassword</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
