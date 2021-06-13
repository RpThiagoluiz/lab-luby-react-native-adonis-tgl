import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
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
import {
  isEmptyEmail,
  isEmptyName,
  isValidRegex,
  isMinChars,
} from "../../../utils/validateEmptyFields";
import { AuthFooter } from "../AuthFooter";
import { InputContainer } from "../InputContainer";
import { colors } from "../../../styles/colors";
import { InputWrapper } from "../InputWrapper";
import { InputPassWrapper } from "../InputPassWrapper";
import { PressableText } from "../PressableText";
import { api } from "../../../services/api";
import { booleanSingUpFields, stringSingUpFields } from "./../../../@types";

interface AuthScreensProps {
  title: string;
  children: React.ReactNode;
}

export const AuthSingUpContent = ({
  title,
  children: OnPressActionChildren,
}: AuthScreensProps) => {
  const [newUser, setNewUser] = useState<stringSingUpFields>({
    name: "",
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState<stringSingUpFields>({
    name: "",
    email: "",
    password: "",
  });

  const [isFocused, setIsFocused] = useState<booleanSingUpFields>({
    name: false,
    email: false,
    password: false,
  });

  const [isFilled, setIsFilled] = useState<booleanSingUpFields>({
    name: false,
    email: false,
    password: false,
  });
  const [haveError, setHaveError] = useState<booleanSingUpFields>({
    name: false,
    email: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation();

  const handleNameInput = (value: string) => {
    setIsFilled((prevState) => ({ ...prevState, name: !!value }));
    setNewUser((prevState) => ({ ...prevState, name: value }));
  };

  const handleEmailInput = (value: string) => {
    setIsFilled((prevState) => ({ ...prevState, email: !!value }));
    setNewUser((prevState) => ({ ...prevState, email: value }));
  };

  const handlePasswordInput = (value: string) => {
    setIsFilled((prevState) => ({ ...prevState, password: !!value }));
    setNewUser((prevState) => ({ ...prevState, password: value }));
  };

  const handleFocusInput = (name: string) => {
    switch (name) {
      case "name":
        setIsFocused((prevState) => ({ ...prevState, name: true }));
        break;
      case "email":
        setIsFocused((prevState) => ({ ...prevState, email: true }));
        break;
      case "password":
        setIsFocused((prevState) => ({
          ...prevState,
          password: true,
        }));
        break;

      default:
        break;
    }
  };

  const handleBlurInput = (inputName: string) => {
    const { name, email, password } = newUser;
    switch (inputName) {
      case "name":
        setIsFocused((prevState) => ({ ...prevState, name: false }));
        setIsFilled((prevState) => ({
          ...prevState,
          name: !!newUser.name,
        }));

        try {
          setHaveError((prevState) => ({ ...prevState, name: false }));
          if (!isEmptyName(name)) {
            setHaveError((prevState) => ({
              ...prevState,
              name: true,
            }));
            throw new Error(`O campo deve ter mais que 3 letras`);
          }
        } catch (error) {
          setErrorText((prevState) => ({ ...prevState, name: error.message }));
        }
        break;
      case "email":
        setIsFocused((prevState) => ({ ...prevState, email: false }));
        setIsFilled((prevState) => ({
          ...prevState,
          email: !!newUser.email,
        }));

        try {
          setHaveError((prevState) => ({
            ...prevState,
            email: false,
          }));
          if (!isEmptyEmail(email) || !isValidRegex(email)) {
            setHaveError((prevState) => ({
              ...prevState,
              email: true,
            }));
            throw new Error(`Email invalido`);
          }
        } catch (error) {
          setErrorText((prevState) => ({ ...prevState, email: error.message }));
        }

        break;
      case "password":
        setIsFocused((prevState) => ({
          ...prevState,
          password: false,
        }));
        setIsFilled((prevState) => ({
          ...prevState,
          password: !!newUser.password,
        }));

        try {
          setHaveError((prevState) => ({
            ...prevState,
            password: false,
          }));

          if (!isMinChars(password)) {
            setHaveError((prevState) => ({
              ...prevState,
              password: true,
            }));
            throw new Error(`Campo deve ter pelo menos 6 digitos`);
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

  const handleSignUp = useCallback(async () => {
    setIsLoading(false);

    const { name, email, password } = newUser;

    const sendData = async (user: stringSingUpFields) => {
      const response = await api.post("/users", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      return response;
    };

    try {
      if (name && email && password) {
        const enteredName = isEmptyName(name);
        const enteredEmail = isEmptyEmail(email) && isValidRegex(email);
        const enteredPassword = isMinChars(password);

        const formIsValid = enteredName && enteredEmail && enteredPassword;

        if (formIsValid) {
          setIsLoading(true);
          const userData = {
            name,
            email,
            password,
          };

          await sendData(userData);

          if (!sendData(userData)) {
            throw new Error(`Error ao Cadastrar o usuario!`);
          }

          Alert.alert(
            `Ola, ${userData.name} 👋`,
            `Seu cadastro foi realizado com sucesso, aproveite o App 😊`
          );
          navigate("Login");
        }
      } else return;
    } catch (error) {
      setIsLoading(false);
      Alert.alert(`Error`, error.message);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
                  text="Name"
                  onChangeText={handleNameInput}
                  validData={isFocused.name || isFilled.name}
                  onBlur={() => handleBlurInput("name")}
                  onFocus={() => handleFocusInput("name")}
                  inputError={haveError.name}
                  inputErrorText={errorText.name}
                />
                <InputWrapper
                  text="Email"
                  onChangeText={handleEmailInput}
                  validData={isFocused.email || isFilled.email}
                  onBlur={() => handleBlurInput("email")}
                  onFocus={() => handleFocusInput("email")}
                  inputError={haveError.email}
                  inputErrorText={errorText.email}
                />
                <InputPassWrapper
                  onChangeText={handlePasswordInput}
                  validData={isFocused.password || isFilled.password}
                  onBlur={() => handleBlurInput("password")}
                  onFocus={() => handleFocusInput("password")}
                  inputError={haveError.password}
                  inputErrorText={errorText.password}
                />

                {isLoading ? (
                  <ActivityIndicator
                    color={colors.yellow_green}
                    style={{ padding: 40 }}
                  />
                ) : (
                  <PressableText
                    text="Register"
                    color={colors.yellow_green}
                    onPress={handleSignUp}
                    icon={{
                      color: colors.yellow_green,
                      name: "arrow-right",
                      size: 30,
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
