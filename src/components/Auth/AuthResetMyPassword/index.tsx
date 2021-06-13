import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Alert,
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
  const [errorText, setErrorText] = useState("");
  const [enteredPassword, setEnteredPassword] = useState({
    password: "",
    isValid: false,
  });
  const [haveError, setHaveError] = useState(false);

  const { navigate } = useNavigation();

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setEnteredPassword((prevState) => ({ ...prevState, isValid: false }));

    setIsFocused(false);
    setIsFilled(!!enteredPassword);

    try {
      setErrorText("");
      setHaveError(false);
      if (enteredPassword.password.length < 6) {
        setHaveError(true);
        throw new Error("Pelo menos 6 caracteres");
      }
      setEnteredPassword((prevState) => ({ ...prevState, isValid: true }));
    } catch (error) {
      setErrorText(error.message);
    }
  };

  const handleInputPassword = (value: string) => {
    setIsFilled(!!value);
    setEnteredPassword((prevState) => ({ ...prevState, password: value }));
  };

  const handleLogIn = () => {
    //Access Token - in web route
    if (enteredPassword.isValid) {
      Alert.alert("Sorry", `Just WebService... Go to betLogin ╚(•⌂•)╝`);
      navigate("Login");
    } else {
      Alert.alert("😪", `Password invalido!`);
    }
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
                <InputPassWrapper
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  validData={isFocused || isFilled}
                  inputError={haveError}
                  inputErrorText={errorText}
                  onChangeText={handleInputPassword}
                />

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

              <AuthFooter stylesMarginTop="240px" />
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
