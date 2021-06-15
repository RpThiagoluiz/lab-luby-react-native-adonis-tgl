import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppTabs } from "./tabs.routes";
import { colors } from "../styles/colors";
import { DrawerScreen } from "./drawer.routes";

const stackRoutes = createStackNavigator();

export const StackAppRoutes = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.background,
      },
    }}
  >
    <stackRoutes.Screen name="Home" component={AppTabs} />
    <stackRoutes.Screen name="NewGame" component={AppTabs} />
    <stackRoutes.Screen name="Account" component={AppTabs} />
  </stackRoutes.Navigator>
);
