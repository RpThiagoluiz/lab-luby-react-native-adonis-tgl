import React from "react";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../hook/authContext";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ViewContainer, TextTitle, ViewContent, ViewWrapper } from "./styles";
import { colors } from "../../../styles/colors";

export const AppHeader = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ViewContainer>
      <ViewContent>
        <ViewWrapper>
          <TextTitle>TGL</TextTitle>
          <View style={styles.after}></View>
        </ViewWrapper>
        <TouchableOpacity activeOpacity={0.8} onPress={handleLogout}>
          <Feather name="log-out" size={36} color={colors.gray_100} />
          <View style={styles.line}></View>
        </TouchableOpacity>
      </ViewContent>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  after: {
    //Just PseudoElement,
    marginBottom: 40,
    width: 80,
    borderBottomWidth: 7,
    borderRadius: 15,
    borderColor: colors.yellow_green,
  },
  line: {
    //Just PseudoElement,
    marginBottom: 40,
    width: 0,
    borderBottomWidth: 7,
    borderRadius: 15,
    backgroundColor: "white",
  },
});
