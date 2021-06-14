import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../../styles/colors";

export const LoadingActivyIndicator = () => (
  <View style={styles.activityIndicatorContainer}>
    <ActivityIndicator
      size="large"
      color={colors.yellow_green}
      style={{ padding: 40 }}
    />
  </View>
);

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
