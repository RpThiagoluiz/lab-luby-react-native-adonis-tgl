import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "../styles/colors";
import { Login } from "../screens/Login";
import { ForgotPass } from "../screens/ForgotPass";
import { ResetPassword } from "../screens/ResetPassword";
import { SingUp } from "../screens/SingUp";

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
    <stackRoutes.Screen name="Login" component={Login} />
    <stackRoutes.Screen name="ForgotPass" component={ForgotPass} />
    <stackRoutes.Screen name="SingUp" component={SingUp} />
    <stackRoutes.Screen name="ResetPassword" component={ResetPassword} />
  </stackRoutes.Navigator>
);
