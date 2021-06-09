import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { PressableText } from "../components/Auth/PressableText";
import { AuthSingUpContent } from "../components/Auth/AuthSingUpContent";
import { colors } from "../styles/colors";

export const SingUp = () => {
  const { goBack } = useNavigation();

  const handleBack = () => {
    goBack();
  };

  return (
    <AuthSingUpContent title="Registration" navigation="Login">
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
    </AuthSingUpContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
