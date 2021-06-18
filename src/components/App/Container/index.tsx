import React from "react";
import { ViewContainer } from "./styles";

interface AppContainerProps {
  children: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => (
  <ViewContainer>{children}</ViewContainer>
);
