import React from "react";
import { useNavigation } from "@react-navigation/core";
import { PressableText } from "../../components/Auth/PressableText";
import { AuthResetMyPassword } from "../../components/Auth/AuthResetMyPassword";
import { colors } from "../../styles/colors";

export const ResetPass = () => {
  const { goBack } = useNavigation();

  const handleBack = () => {
    goBack();
  };

  return (
    <AuthResetMyPassword title="Reset Password" navigation="Login">
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
    </AuthResetMyPassword>
  );
};
