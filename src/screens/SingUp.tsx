import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { PressableText } from "../components/PressableText";
import { AuthScreens } from "../components/AuthScreens";
import { colors } from "../styles/colors";

export const SingUp = () => {
  const { goBack } = useNavigation();

  const handleBack = () => {
    goBack();
  };

  return (
    <AuthScreens title="Registration" navigation="Login">
      <PressableText
        text="Back"
        color={colors.gray_700}
        onPress={handleBack}
        icon={{
          name: "arrow-left",
          size: 38,
          color: colors.gray_700,
        }}
      />
    </AuthScreens>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
