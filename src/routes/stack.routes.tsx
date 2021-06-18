import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../styles/colors";
import { ForgotPass } from "../screens/Auth/ForgotMyPass";
import { ResetPass } from "../screens/Auth/ResetMyPass";
import { SingUp } from "../screens/Auth/SingUp";
import { AuthLoginScreen } from "../screens/Auth/AuthLogin";

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
