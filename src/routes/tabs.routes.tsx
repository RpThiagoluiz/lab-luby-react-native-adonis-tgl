import React from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { AppHome } from "../screens/App/Home";
import { DrawerScreen } from "./drawer.routes";
import { Account } from "../screens/App/Account";
import { colors } from "../styles/colors";

import { BetsIcon } from "../assets/SVG/BetsIcon";

const AppCreateScreens = createBottomTabNavigator();

export const AppTabs = () => (
  <AppCreateScreens.Navigator
    tabBarOptions={{
      showLabel: false,

      style: {
        alignItems: "center",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,

        ...Platform.select({
          android: {
            height: 70,
          },
          ios: {
            height: 80,
          },
        }),
      },
    }}
  >
    <AppCreateScreens.Screen
      name="Home"
      component={AppHome}
      options={{
        tabBarIcon: ({ size, focused }) => (
          <View style={styles.container}>
            {focused && <View style={styles.after}></View>}
            <SimpleLineIcons
              name="home"
              size={size}
              color={focused ? colors.yellow_green : colors.gray_300}
            />
            <Text style={focused ? styles.textActive : styles.text}>Home</Text>
          </View>
        ),
      }}
    />

    <AppCreateScreens.Screen
      name="NewGame"
      component={DrawerScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              marginBottom: 40,
              ...Platform.select({ android: { marginBottom: 60 } }),
            }}
          >
            <BetsIcon width="110" height="110" focus={focused} />
          </View>
        ),
      }}
    />

    <AppCreateScreens.Screen
      name="Account"
      component={Account}
      options={{
        tabBarIcon: ({ size, focused }) => (
          <View style={styles.container}>
            {focused && <View style={styles.after}></View>}
            <Ionicons
              name="person-outline"
              size={size}
              color={focused ? colors.yellow_green : colors.gray_300}
            />
            <Text style={focused ? styles.textActive : styles.text}>
              Account
            </Text>
          </View>
        ),
      }}
    />
  </AppCreateScreens.Navigator>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  after: {
    //Just PseudoElement,
    marginBottom: 4,
    width: 40,
    borderBottomWidth: 4,
    borderRadius: 15,
    borderColor: colors.yellow_green,
  },

  text: {
    fontStyle: "italic",
    color: colors.gray_300,
  },
  textActive: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: colors.gray_700,
  },
});
