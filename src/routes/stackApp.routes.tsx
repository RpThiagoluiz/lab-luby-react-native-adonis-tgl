import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../styles/colors";
import { AppHome } from "../components/App/AppHome";

const stackRoutes = createStackNavigator();

export const StackAppRoutes = () => (
  <stackRoutes.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.background,
      },
    }}
  >
    <stackRoutes.Screen name="AppHome" component={AppHome} />
  </stackRoutes.Navigator>
);
