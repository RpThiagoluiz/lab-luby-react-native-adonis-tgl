import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  ActivityIndicator,
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
import {
  isValidRegex,
  isMinChars,
  isEmptyEmail,
} from "../../../utils/validateEmptyFields";
import { LoadingLottery } from "../../Loading";

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
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [isFilled, setIsFilled] = useState({
    email: false,
    password: false,
  });
  const [enteredData, setEnteredData] = useState({
    email: "",
    password: "",
  });
  const [haveError, setHaveError] = useState({
    email: false,
    password: false,
  });
  const [errorText, setErrorText] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const handleForgotPass = () => {
    navigate("ForgotPass");
  };

  const handleInputBlur = (inputName: string) => {
    const { email, password } = enteredData;

    switch (inputName) {
      case "email":
        setIsFocused((prevState) => ({ ...prevState, email: false }));
        setIsFilled((prevState) => ({
          ...prevState,
          email: !!email,
        }));

        try {
          setHaveError((prevState) => ({ ...prevState, email: false }));

          if (!isEmptyEmail(email) || !isValidRegex(email)) {
            setHaveError((prevState) => ({
              ...prevState,
              email: true,
            }));
            throw new Error(`Digite um email valido`);
          }
        } catch (error) {
          setErrorText((prevState) => ({ ...prevState, email: error.message }));
        }
        break;
      case "password":
        setIsFocused((prevState) => ({ ...prevState, password: false }));
        setIsFilled((prevState) => ({
          ...prevState,
          password: !!password,
        }));

        try {
          setHaveError((prevState) => ({ ...prevState, password: false }));
          if (!isMinChars(password)) {
            setHaveError((prevState) => ({
              ...prevState,
              password: true,
            }));

            throw new Error(`Password deve ter no minimo 6 caracteres!`);
          }
        } catch (error) {
          setErrorText((prevState) => ({
            ...prevState,
            password: error.message,
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleInputFocus = (name: string) => {
    switch (name) {
      case "email":
        setIsFocused((prevState) => ({ ...prevState, email: true }));
        break;
      case "password":
        setIsFocused((prevState) => ({ ...prevState, password: true }));
        break;

      default:
        break;
    }
  };

  const handleInputEmailData = (value: string) => {
    setIsFilled((prevState) => ({ ...prevState, email: !!value }));
    setEnteredData((prevState) => ({
      ...prevState,
      email: value,
    }));
  };

  const handleInputPassData = (value: string) => {
    setIsFilled((prevState) => ({ ...prevState, password: !!value }));
    setEnteredData((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  const handleLogIn = async () => {
    //Error da aq ou no singIn function
    setIsLoading(false);
    try {
      const { email, password } = enteredData;
      if (email && password) {
        const enteredEmail = isEmptyEmail(email) && isValidRegex(email);
        const enteredPassword = isMinChars(password);

        const formIsValid = enteredEmail && enteredPassword;

        if (formIsValid) {
          setIsLoading(true);
          const user = {
            email,
            password,
          };

          await signIn(user);
          setIsLoading(false);
          if (!signIn(user)) throw new Error(`Dados nao conferem.`);
        }
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
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
                  onBlur={() => handleInputBlur("email")}
                  onFocus={() => handleInputFocus("email")}
                  validData={isFocused.email || isFilled.email}
                  onChangeText={handleInputEmailData}
                  existsError={haveError.email}
                  inputError={haveError.email}
                  inputErrorText={errorText.email}
                />
                <InputPassWrapper
                  onBlur={() => handleInputBlur("password")}
                  onFocus={() => handleInputFocus("password")}
                  validData={isFocused.password || isFilled.password}
                  onChangeText={handleInputPassData}
                  existsError={haveError.password}
                  inputError={haveError.password}
                  inputErrorText={errorText.password}
                />

                <ForgotPassWrapper>
                  <ForgotPass onPress={handleForgotPass}>
                    I forgot my password
                  </ForgotPass>
                </ForgotPassWrapper>

                {isLoading ? (
                  <ActivityIndicator
                    color={colors.yellow_green}
                    style={{ padding: 40 }}
                  />
                ) : (
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
                )}
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
