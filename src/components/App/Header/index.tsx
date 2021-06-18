import React from "react";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../hook/authContext";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { ViewContainer, TextTitle, ViewContent, ViewWrapper } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";
import { useNavigation } from "@react-navigation/native";

interface AppHeaderProps {
  haveCart?: boolean;
}

export const AppHeader = ({ haveCart }: AppHeaderProps) => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const handleNavigationCartDrawer = () => {
    console.log(`drawer cart`);
  };

  return (
    <ViewContainer>
      <ViewContent>
        <View>
          <TextTitle>TGL</TextTitle>
          <View style={styles.after}></View>
        </View>
        <TouchableOpacity activeOpacity={0.8}>
          <ViewWrapper>
            {haveCart && (
              <MaterialCommunityIcons
                name="cart-outline"
                size={40}
                color={colors.yellow_green}
                onPress={handleNavigationCartDrawer}
              />
            )}
            <Feather
              onPress={handleLogout}
              style={{ marginLeft: 20 }}
              name="log-out"
              size={36}
              color={colors.gray_100}
            />
          </ViewWrapper>
          <View style={styles.line}></View>
        </TouchableOpacity>
      </ViewContent>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  after: {
    //Just PseudoElement,
    marginBottom: 40,
    width: 80,
    borderBottomWidth: 7,
    borderRadius: 15,
    borderColor: colors.yellow_green,
  },
  line: {
    //Just PseudoElement,
    marginBottom: 40,
    width: 0,
    borderBottomWidth: 7,
    borderRadius: 15,
    backgroundColor: "white",
  },
});
