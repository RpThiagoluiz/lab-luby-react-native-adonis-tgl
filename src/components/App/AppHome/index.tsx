import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../../hook/authContext";

export const AppHome = () => {
  const { signOut, findToken } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  useEffect(() => {
    console.log(findToken);
  }, []);

  return (
    <View style={styles.container}>
      <Text>LOGADO!</Text>
      <Text onPress={handleLogout}>Deslogar</Text>
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
