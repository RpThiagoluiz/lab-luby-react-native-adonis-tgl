import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hook/authContext";
import { StackRoutes } from "./stack.routes";
import { StackAppRoutes } from "./stackApp.routes";
import { LoadingLottery } from "../components/Loading";

export const Routes = () => {
  const { signed, loading } = useAuth();

  if (loading) return <LoadingLottery />;

  return (
    <NavigationContainer>
      {signed ? <StackAppRoutes /> : <StackRoutes />}
    </NavigationContainer>
  );
};
