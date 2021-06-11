import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hook/authContext";
import { StackRoutes } from "./stack.routes";
import { StackAppRoutes } from "./stackApp.routes";
import { LoadingLottery } from "../components/Loading";

export const Routes = () => {
  const { logged, loading } = useAuth();

  if (loading) return <LoadingLottery />;

  return (
    <NavigationContainer>
      {logged ? <StackAppRoutes /> : <StackRoutes />}
    </NavigationContainer>
  );
};
