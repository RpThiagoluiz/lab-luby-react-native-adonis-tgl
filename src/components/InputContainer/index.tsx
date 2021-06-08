import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

import {
  SafeAreaView,
  KeyboardAvoidingView,
  FormContent,
  InputContent,
} from "./styles";
import { colors } from "../../styles/colors";

export const InputContainer = () => {
  return (
    <SafeAreaView style={styles.elevation}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <FormContent>
              <InputContent>
                <Text>Email</Text>
                <TextInput />
              </InputContent>

              <InputContent>
                <Text>Password</Text>
                <TextInput />
              </InputContent>
            </FormContent>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
