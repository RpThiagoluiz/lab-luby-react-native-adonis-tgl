import React from "react";
import { StyleSheet, Platform } from "react-native";
import { ContainerView, FormContent } from "./styles";

interface InputContainerProps {
  children: React.ReactNode;
}

export const InputContainer = ({ children }: InputContainerProps) => {
  return (
    <ContainerView style={styles.elevation}>
      <FormContent>{children}</FormContent>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  elevation: {
    //just for Android to make box-shadow
    ...Platform.select({
      android: {
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
      },
    }),
  },
});
