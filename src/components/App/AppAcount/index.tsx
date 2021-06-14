import React, { useCallback, useState, useEffect } from "react";
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ViewContainer,
  ViewWrapper,
  ViewWrapperData,
  TextData,
} from "./styles";
import { InputWrapper } from "../../Auth/InputWrapper";
import { InputPassWrapper } from "../../Auth/InputPassWrapper";
import { PressableText } from "../../Auth/PressableText";
import { InputContainer } from "../../Auth/InputContainer";
import { AppHeader } from "../AppHeader";
import { colors } from "../../../styles/colors";
import { booleanSingUpFields, stringSingUpFields } from "../../../@types";
import {
  isEmptyEmail,
  isEmptyName,
  isValidRegex,
  isMinChars,
} from "../../../utils/validateEmptyFields";
import { api } from "../../../services/api";
import { userData } from "../../../@types";
import { ServerOff } from "../ServerOff";
import { LoadingActivyIndicator } from "../LoadingActivyIndicator";
import { AppContainer } from "../AppContainer";
import { SubTitles } from "../SubTitle";

export const AppAccount = () => {
  const [userData, setUserData] = useState<userData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFilled, setIsFilled] = useState<booleanSingUpFields>({
    name: false,
    email: false,
    password: false,
  });

  const [isFocused, setIsFocused] = useState<booleanSingUpFields>({
    name: false,
    email: false,
    password: false,
  });

  const [haveError, setHaveError] = useState<booleanSingUpFields>({
    name: false,
    email: false,
    password: false,
  });

  const [errorText, setErrorText] = useState<stringSingUpFields>({
    name: "",
    email: "",
    password: "",
  });

  const [enteredUserData, setEnteredUserData] = useState<stringSingUpFields>({
    name: "",
    email: "",
    password: "",
  });

  const [loadUserInfo, setLoadUserInfo] = useState(false);
  const [serverOff, setServerOff] = useState(false);

  const { navigate } = useNavigation();

  useEffect(() => {
    async function getUserData() {
      setIsLoading(true);
      try {
        await api.get("/users/1").then((response) => {
          const { data } = response;

          setUserData(data);
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setServerOff(true);
      }
    }
    getUserData();
  }, [loadUserInfo]);

  const handleNameInput = (value: string) => {
    setIsFilled((prevState) => ({ ...prevState, name: !!value }));
    setEnteredUserData((prevState) => ({ ...prevState, name: value }));
  };

  const handleEmailInput = (value: string) => {
    setIsFilled((prevState) => ({ ...prevState, email: !!value }));
    setEnteredUserData((prevState) => ({ ...prevState, email: value }));
  };

  const handlePasswordInput = (value: string) => {
    setIsFilled((prevState) => ({ ...prevState, password: !!value }));
    setEnteredUserData((prevState) => ({ ...prevState, password: value }));
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
    const { name, email, password } = enteredUserData;
    switch (inputName) {
      case "name":
        setIsFocused((prevState) => ({ ...prevState, name: false }));
        setIsFilled((prevState) => ({
          ...prevState,
          name: !!enteredUserData.name,
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
          email: !!enteredUserData.email,
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
          password: !!enteredUserData.password,
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

  const handleUpdate = useCallback(async () => {
    const checkData = (data: stringSingUpFields) => {
      if (data.name === "" && userData) {
        setEnteredUserData((prevState) => ({
          ...prevState,
          name: userData.username,
        }));
      } else if (data.email === "" && userData) {
        setEnteredUserData((prevState) => ({
          ...prevState,
          email: userData.email,
        }));
      }
    };

    const sendData = async (user: stringSingUpFields) => {
      const response = await api.put("/users/1", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      return response;
    };

    try {
      checkData(enteredUserData);
      const { name, email, password } = enteredUserData;

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
            `Seu Dados Foram atualizados com sucesso 😊`
          );
          setEnteredUserData({
            name: "",
            email: "",
            password: "",
          });
          setLoadUserInfo(true);
          setIsLoading(false);
          navigate("Home");
        }
      } else {
        return;
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(`Error`, error.message);
    }
  }, [enteredUserData]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}
      >
        <ViewContainer>
          <AppHeader />
          <ScrollView>
            <ViewWrapper>
              {userData && (
                <View>
                  <InputContainer>
                    <InputWrapper
                      text={`User name`}
                      placeholder={userData?.username}
                      onBlur={() => handleBlurInput("name")}
                      onFocus={() => handleFocusInput("name")}
                      validData={isFocused.name || isFilled.name}
                      onChangeText={handleNameInput}
                      inputError={haveError.name}
                      inputErrorText={errorText.name}
                      value={enteredUserData.name}
                    />
                    <InputWrapper
                      text={`Email`}
                      placeholder={userData?.email}
                      onBlur={() => handleBlurInput("email")}
                      onFocus={() => handleFocusInput("email")}
                      validData={isFocused.email || isFilled.email}
                      onChangeText={handleEmailInput}
                      inputError={haveError.email}
                      inputErrorText={errorText.email}
                      value={enteredUserData.email}
                    />
                    <InputPassWrapper
                      onBlur={() => handleBlurInput("password")}
                      onFocus={() => handleFocusInput("password")}
                      validData={isFocused.password || isFilled.password}
                      onChangeText={handlePasswordInput}
                      inputError={haveError.password}
                      inputErrorText={errorText.password}
                      value={enteredUserData.password}
                    />

                    {isLoading ? (
                      <LoadingActivyIndicator />
                    ) : (
                      <PressableText
                        text="Update"
                        color={colors.yellow_green}
                        onPress={handleUpdate}
                      />
                    )}
                  </InputContainer>
                  <ViewWrapperData>
                    <TextData>Conta criada: {userData?.created_at}</TextData>
                    <TextData>
                      Ultima atualizacao: {userData?.updated_at}
                    </TextData>
                  </ViewWrapperData>
                </View>
              )}
              {serverOff && (
                <AppContainer>
                  <ServerOff />
                </AppContainer>
              )}
            </ViewWrapper>
          </ScrollView>
        </ViewContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
