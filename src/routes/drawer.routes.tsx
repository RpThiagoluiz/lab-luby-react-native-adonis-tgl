import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Cart } from "../screens/Cart";

const Drawer = createDrawerNavigator();
export const DrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="NewGame" component={Cart} />
  </Drawer.Navigator>
);
