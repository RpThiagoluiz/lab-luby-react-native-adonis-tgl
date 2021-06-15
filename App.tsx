import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { AuthProvider } from "./src/hook/authContext";
import { ThemeProvider } from "styled-components";
import { Routes } from "./src/routes";
import { colors } from "./src/styles/colors";

export default function App() {
  let [customFonts] = useFonts({
    HelveticaUltraLight: require("./assets/fonts/HelveticaNeue.ttf"),
    HelveticaThin: require("./assets/fonts/HelveticaNeueThin.ttf"),
    HelveticaLight: require("./assets/fonts/HelveticaNeueLight.ttf"),
    HelveticaMedium: require("./assets/fonts/HelveticaNeueMedium.ttf"),
    HelveticaBold: require("./assets/fonts/HelveticaNeueBold.ttf"),
    HelveticaHeavy: require("./assets/fonts/HelveticaNeueHv.ttf"),
    HelveticaItalic: require("./assets/fonts/HelveticaNeueIt.ttf"),
  });

  if (!customFonts) return <AppLoading />;

  return (
    <ThemeProvider theme={{ colors }}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
