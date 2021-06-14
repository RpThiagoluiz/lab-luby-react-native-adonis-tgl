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

  const { navigate } = useNavigation();

  //Problema, se o usuario atualizar os dados, eu estou trazendo os dados atualizados do
  //context - la ele nao vai atualizar auto. Aq eu vou ter q atualizar tbm
  // no asyncStorage ou trazer os dados do back end em uma request.

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
        Alert.alert(error.message);
      }
    }

    getUserData();
  }, []);

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
    //back verificar o id do usuario auth.

    console.log(enteredUserData);

    //Just discoment
    // const { name, email, password } = enteredUserData;

    //     const sendData = async (user: stringSingUpFields) => {
    //       const response = await api.put("/users/1", {
    //         username: user.name,
    //         email: user.email,
    //         password: user.password,
    //       });
    //       return response;
    //     };

    //     try {
    //       if (name && email && password) {
    //         const enteredName = isEmptyName(name);
    //         const enteredEmail = isEmptyEmail(email) && isValidRegex(email);
    //         const enteredPassword = isMinChars(password);

    //         const formIsValid = enteredName && enteredEmail && enteredPassword;

    //         if (formIsValid) {
    //           setIsLoading(true);
    //           const userData = {
    //             name,
    //             email,
    //             password,
    //           };

    //           await sendData(userData);

    //           if (!sendData(userData)) {
    //             throw new Error(`Error ao Cadastrar o usuario!`);
    //           }

    //           Alert.alert(
    //             `Ola, ${userData.name} 👋`,
    //             `Seu Dados Foram atualizados com sucesso 😊`
    //           );
    //           //navigate("Home");
    //         }
    //       } else return;
    //     } catch (error) {
    //       setIsLoading(false);
    //       Alert.alert(`Error`, error.message);
    //     }
  }, []);

  if (userData) {
    const { email, username, created_at, updated_at } = userData;
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
                <InputContainer>
                  <InputWrapper
                    text={`User name`}
                    placeholder={username}
                    onBlur={() => handleBlurInput("name")}
                    onFocus={() => handleFocusInput("name")}
                    validData={isFocused.name || isFilled.name}
                    onChangeText={handleNameInput}
                    inputError={haveError.name}
                    inputErrorText={errorText.name}
                  />
                  <InputWrapper
                    text={`Email`}
                    placeholder={email}
                    onBlur={() => handleBlurInput("email")}
                    onFocus={() => handleFocusInput("email")}
                    validData={isFocused.email || isFilled.email}
                    onChangeText={handleEmailInput}
                    inputError={haveError.email}
                    inputErrorText={errorText.email}
                  />
                  <InputPassWrapper
                    onBlur={() => handleBlurInput("password")}
                    onFocus={() => handleFocusInput("password")}
                    validData={isFocused.password || isFilled.password}
                    onChangeText={handlePasswordInput}
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
                      text="Update"
                      color={colors.yellow_green}
                      onPress={handleUpdate}
                    />
                  )}
                </InputContainer>
                <ViewWrapperData>
                  <TextData>Conta criada: {created_at}</TextData>
                  <TextData>Ultima atualizacao: {updated_at}</TextData>
                </ViewWrapperData>
              </ViewWrapper>
            </ScrollView>
          </ViewContainer>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return <Text>Loading ...</Text>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
