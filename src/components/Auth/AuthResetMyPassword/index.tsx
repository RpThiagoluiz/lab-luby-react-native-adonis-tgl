import React, { useState } from "react";
import {
  StyleSheet,
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
import { PressableText } from "../PressableText";
import { InputPassWrapper } from "../InputPassWrapper";

interface AuthScreensProps {
  title: string;
  navigation: string;
  children: React.ReactNode;
}

export const AuthResetMyPassword = ({
  title,
  navigation,
  children: OnPressActionChildren,
}: AuthScreensProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");

  const { navigate } = useNavigation();

  const handleInputEmailData = (value: string) => {
    setIsFilled(!!value);
    setEnteredEmail(value);
  };

  const handleLogIn = () => {
    alert(`Fetch Para Enviar novo Password`);
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
                <InputPassWrapper />

                <PressableText
                  text="Confirm"
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
