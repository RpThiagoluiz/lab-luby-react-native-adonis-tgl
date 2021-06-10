import React, { useState } from "react";
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
  ForgotPassWrapper,
  ForgotPass,
} from "./styles";
import { AuthFooter } from "../AuthFooter";
import { InputContainer } from "../InputContainer";
import { colors } from "../../../styles/colors";
import { InputWrapper } from "../InputWrapper";
import { InputPassWrapper } from "../InputPassWrapper";
import { PressableText } from "../PressableText";
import { useAuth } from "../../../hook/authContext";

interface AuthScreensProps {
  title: string;
  navigation: string;
  children: React.ReactNode;
}

//Active indicador no lugar do button

export const AuthLoginContent = ({
  title,
  children: OnPressActionChildren,
}: AuthScreensProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [enteredData, setEnteredData] = useState({
    email: "",
    password: "",
  });

  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const handleLogIn = async () => {
    try {
      if (!!enteredData) {
        const { email, password } = enteredData;
        await signIn({
          email,
          password,
        });
      } else {
        throw new Error(`dados invalidos`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleForgotPass = () => {
    navigate("ForgotPass");
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!enteredData);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputEmailData = (value: string) => {
    setIsFilled(!!value);
    setEnteredData((prevState) => ({
      ...prevState,
      email: value,
    }));
  };

  const handleInputPassData = (value: string) => {
    setIsFilled(!!value);
    setEnteredData((prevState) => ({
      ...prevState,
      password: value,
    }));
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
                <InputWrapper
                  text="Email"
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  validData={isFocused || isFilled}
                  onChangeText={handleInputEmailData}
                />
                <InputPassWrapper
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  validData={isFocused || isFilled}
                  onChangeText={handleInputPassData}
                />

                <ForgotPassWrapper>
                  <ForgotPass onPress={handleForgotPass}>
                    I forgot my password
                  </ForgotPass>
                </ForgotPassWrapper>

                <PressableText
                  text="Log In"
                  color={colors.yellow_green}
                  onPress={handleLogIn}
                  icon={{
                    color: colors.yellow_green,
                    name: "arrow-right",
                    size: 24,
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
