import React from "react";
import { useNavigation } from "@react-navigation/core";
import { PressableText } from "../components/PressableText";
import { AuthScreens } from "../components/AuthScreens";
import { colors } from "../styles/colors";

export const AuthLoginScreen = () => {
  const { navigate } = useNavigation();

  const handleSingUp = () => {
    navigate("SingUp");
  };

  return (
    <AuthScreens title="Autentication" navigation="">
      <PressableText
        text="Sing Up"
        color={colors.gray_700}
        onPress={handleSingUp}
        icon={{
          name: "arrow-right",
          size: 38,
          color: colors.gray_700,
        }}
      />
    </AuthScreens>
  );
};
