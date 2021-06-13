import React, { useState } from "react";
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import {
  ViewContainer,
  ViewWrapper,
  ViewWrapperData,
  TextData,
} from "./styles";
import { useAuth } from "../../../hook/authContext";
import { InputWrapper } from "../../Auth/InputWrapper";
import { InputPassWrapper } from "../../Auth/InputPassWrapper";
import { PressableText } from "../../Auth/PressableText";
import { InputContainer } from "../../Auth/InputContainer";
import { AppHeader } from "../AppHeader";
import { colors } from "../../../styles/colors";
import { userData } from "../../../@types";

export const AppAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredUserData, setEnteredUserData] = useState<userData>();

  const { user } = useAuth();

  console.log(user);

  if (user) {
    const { email, username, created_at, updated_at } = user;
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
                    onBlur={() => {}}
                    onFocus={() => {}}
                    //validData={isFocused.email || isFilled.email}
                    //onChangeText={handleInputEmailData}
                    //existsError={haveError.email}
                    //inputError={haveError.email}
                    //inputErrorText={errorText.email}
                  />
                  <InputWrapper
                    text={`Email`}
                    placeholder={email}
                    onBlur={() => {}}
                    onFocus={() => {}}
                    //validData={isFocused.email || isFilled.email}
                    //onChangeText={handleInputEmailData}
                    //existsError={haveError.email}
                    //inputError={haveError.email}
                    //inputErrorText={errorText.email}
                  />
                  <InputPassWrapper
                    onBlur={() => {}}
                    onFocus={() => {}}
                    //validData={isFocused.password || isFilled.password}
                    //onChangeText={handleInputPassData}
                    //existsError={haveError.password}
                    //inputError={haveError.password}
                    //inputErrorText={errorText.password}
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
                      onPress={() => {}}
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
