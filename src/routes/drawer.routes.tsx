import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NewBets } from "../screens/App/NewBets";
import { CartDrawer } from "../components/App/Cart/CartDrawer";

const Drawer = createDrawerNavigator();
export const DrawerScreen = () => (
  <Drawer.Navigator
    initialRouteName="NewBets"
    drawerContent={(props) => <CartDrawer {...props} />}
    drawerPosition="right"
    overlayColor="rgba(255, 255, 255, 0.5)"
  >
    <Drawer.Screen name="NewGame" component={NewBets} />
  </Drawer.Navigator>
);
