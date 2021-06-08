import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthFooter } from "../../components/AuthFooter";
import { InputContainer } from "../../components/InputContainer";
import { colors } from "../../styles/colors";

export const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>TGL</Text>
        <View style={styles.after}></View>
        <Text style={styles.subtitle}>Authentication</Text>
      </View>

      <InputContainer />

      <AuthFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  wrapper: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 44,
    fontFamily: "HelveticaBold",
    fontStyle: "italic",
    fontWeight: "bold",
    color: colors.gray_700,
    textAlign: "center",
  },
  after: {
    //Just PseudoElement,
    marginBottom: 40,
    width: 90,
    borderBottomWidth: 7,
    borderRadius: 15,
    borderColor: colors.yellow_green,
  },
  subtitle: {
    fontSize: 35,
    fontFamily: "HelveticaItalic",
    fontWeight: "bold",
    fontStyle: "italic",

    color: colors.gray_700,
  },
});
