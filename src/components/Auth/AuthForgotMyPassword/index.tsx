import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  SafeAreaView,
  ViewContent,
  ViewWrapper,
  TextTitle,
  TextSubTitle,
} from "./styles";
import { AuthFooter } from "../AuthFooter";
import { InputContainer } from "../InputContainer";
import { colors } from "../../../styles/colors";
import { InputWrapper } from "../InputWrapper";
import { PressableText } from "../PressableText";

interface AuthScreensProps {
  title: string;
  navigation: string;
  children: React.ReactNode;
}

export const AuthForgotMyPassword = ({
  title,
  navigation,
  children: OnPressActionChildren,
}: AuthScreensProps) => {
  const { navigate } = useNavigation();

  const handleSingUp = () => {
    navigate(navigation);
  };

  const handleLogIn = () => {
    //just test
    navigate("ResetPass");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <ViewContent>
              <StatusBar
                animated={true}
                backgroundColor={colors.yellow_green}
              />
              <ViewWrapper>
                <TextTitle>TGL</TextTitle>
                <View style={styles.after}></View>
                <TextSubTitle>{title}</TextSubTitle>
              </ViewWrapper>

              <InputContainer>
                <InputWrapper text="Email" />

                <PressableText
                  text="Send Link"
                  color={colors.yellow_green}
                  onPress={handleLogIn}
                  icon={{
                    color: colors.yellow_green,
                    name: "arrow-right",
                    size: 30,
                  }}
                />
              </InputContainer>

              {OnPressActionChildren}

              <AuthFooter />
            </ViewContent>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  after: {
    //Just PseudoElement,
    marginBottom: 40,
    width: 90,
    borderBottomWidth: 7,
    borderRadius: 15,
    borderColor: colors.yellow_green,
  },
});
