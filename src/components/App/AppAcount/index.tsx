import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { api } from "../../../services/api";
import { AppHeader } from "../AppHeader";

export const AppAccount = () => {
  const [userData, setUserData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      setIsLoading(true);
      try {
        const { data } = await api.get("/users/1");
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        alert(error);
      }
    }
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader />
      {isLoading ? <Text>Loading ...</Text> : <Text>{userData.email}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
