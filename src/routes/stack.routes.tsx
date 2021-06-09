import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../styles/colors";
import { ForgotPass } from "../screens/ForgotMyPass";
import { ResetPass } from "../screens/ResetMyPass";
import { SingUp } from "../screens/SingUp";
import { AuthLoginScreen } from "../screens/AuthLogin";

const stackRoutes = createStackNavigator();

export const StackRoutes = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.background,
      },
    }}
  >
    <stackRoutes.Screen name="Login" component={AuthLoginScreen} />
    <stackRoutes.Screen name="ForgotPass" component={ForgotPass} />
    <stackRoutes.Screen name="SingUp" component={SingUp} />
    <stackRoutes.Screen name="ResetPass" component={ResetPass} />
  </stackRoutes.Navigator>
);
