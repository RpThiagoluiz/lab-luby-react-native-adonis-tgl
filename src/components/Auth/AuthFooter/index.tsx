import React from "react";
import { Container, Text } from "./styles";

interface AuthFooterProps {
  stylesMarginTop?: string;
}

export const AuthFooter = ({ stylesMarginTop }: AuthFooterProps) => (
  <Container marginTop={stylesMarginTop}>
    <Text>Copyright 2020 Luby Software</Text>
  </Container>
);
