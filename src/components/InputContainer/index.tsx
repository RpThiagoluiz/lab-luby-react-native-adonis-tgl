import React from "react";
import { StyleSheet, Platform, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  ContainerView,
  FormContent,
  InputContent,
  LabelText,
  PasswordWrapper,
  TextInput,
  PassIconWrapper,
  ForgotPassWrapper,
  ForgotPass,
} from "./styles";
import { colors } from "../../styles/colors";
import { PressableText } from "../PressableText";

interface InputContainerProps {}

export const InputContainer = () => {
  const handleLogIn = () => {
    //Fetch
    Alert.alert(`Brabo!`);
  };

  return (
    <ContainerView style={styles.elevation}>
      <FormContent>
        <InputContent>
          <LabelText>Email</LabelText>
          <TextInput />
        </InputContent>

        <InputContent>
          <PasswordWrapper>
            <LabelText>Password</LabelText>
            <PassIconWrapper>
              <FontAwesome5 name="eye" size={32} color={colors.gray_300} />
            </PassIconWrapper>
          </PasswordWrapper>
          <TextInput />
        </InputContent>

        <ForgotPassWrapper>
          <ForgotPass onPress={() => console.log(`ForgotPass`)}>
            I forgot my password
          </ForgotPass>
        </ForgotPassWrapper>

        <PressableText
          text="Log In"
          color={colors.yellow_green}
          onPress={handleLogIn}
          IconIsRight={true}
          icon={{
            color: colors.yellow_green,
            name: "arrow-right",
            size: 24,
          }}
        />
      </FormContent>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  elevation: {
    //just for Android to make box-shadow
    ...Platform.select({
      android: {
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
      },
    }),
  },
});
