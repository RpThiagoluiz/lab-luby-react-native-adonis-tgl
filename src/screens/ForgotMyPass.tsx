import React from "react";
import { useNavigation } from "@react-navigation/core";
import { PressableText } from "../components/Auth/PressableText";
import { AuthForgotMyPassword } from "../components/Auth/AuthForgotMyPassword";
import { colors } from "../styles/colors";

export const ForgotPass = () => {
  const { goBack, navigate } = useNavigation();

  const handleBack = () => {
    goBack();
  };
  const handleSingUp = () => {
    navigate("SingUp");
  };

  return (
    <AuthForgotMyPassword title="Reset password" navigation="Login">
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
      <PressableText
        text="Sign Up"
        color={colors.gray_700}
        onPress={handleSingUp}
        icon={{
          name: "arrow-right",
          size: 38,
          color: colors.gray_700,
        }}
      />
    </AuthForgotMyPassword>
  );
};
