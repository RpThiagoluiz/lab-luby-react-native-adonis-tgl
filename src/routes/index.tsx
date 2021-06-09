import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hook/authContext";
import { StackRoutes } from "./stack.routes";
import { StackAppRoutes } from "./stackApp.routes";

export const Routes = () => {
  const { logged, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={100} color="#B5C401" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {logged ? <StackAppRoutes /> : <StackRoutes />}
    </NavigationContainer>
  );
};
