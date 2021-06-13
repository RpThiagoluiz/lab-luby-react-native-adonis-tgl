import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../../services/api";
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
  children: OnPressActionChildren,
}: AuthScreensProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [haveError, setHaveError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [enteredEmail, setEnteredEmail] = useState({
    email: "",
    isValid: false,
  });

  const { navigate } = useNavigation();

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setEnteredEmail((prevState) => ({ ...prevState, isValid: false }));

    const regexValidEmail = /^[\w+.]*@\w+.(?:[A-Z]{2,})?.[\w\w]*$/.test(
      enteredEmail.email
    );
    setIsFocused(false);
    setIsFilled(!!enteredEmail.email);

    try {
      setHaveError(false);
      if (!regexValidEmail) {
        setHaveError(true);
        throw new Error("Digite um email valido!");
      }
      setEnteredEmail((prevState) => ({ ...prevState, isValid: true }));
    } catch (error) {
      setErrorText(error.message);
    }
  };

  const handleInputEmailData = (value: string) => {
    setIsFilled(!!value);
    setEnteredEmail((prevState) => ({ ...prevState, email: value }));
  };

  const handleSendDataEmail = async () => {
    setIsLoading(true);

    const sendData = async () => {
      const { email } = enteredEmail;
      const response = await api.post("/forgetpassword", {
        email,
      });
      return response;
    };

    try {
      if (enteredEmail.isValid === true) {
        await sendData();

        Alert.alert(
          "Email enviado",
          "As instrucoes para criar uma nova senha foi enviada para seu email informado."
        );
        navigate("ResetPass");
      } else if (enteredEmail.isValid === false) {
        setErrorText(`Preencha o campo com dados validos!`);
      } else return;

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (Platform.OS !== "android") {
        Alert.alert("🤨", `Email nao cadastrado`);
      } else {
        ToastAndroid.showWithGravity(
          `Email nao cadastrado`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
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
                <InputWrapper
                  text="Email"
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  validData={isFocused || isFilled}
                  onChangeText={handleInputEmailData}
                  inputError={haveError}
                  inputErrorText={errorText}
                />

                {isLoading ? (
                  <ActivityIndicator
                    color={colors.yellow_green}
                    style={{ padding: 40 }}
                  />
                ) : (
                  <PressableText
                    text="Send Link"
                    color={colors.yellow_green}
                    onPress={handleSendDataEmail}
                    icon={{
                      color: colors.yellow_green,
                      name: "arrow-right",
                      size: 30,
                    }}
                  />
                )}
              </InputContainer>

              {OnPressActionChildren}

              <AuthFooter stylesMarginTop="140px" />
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
