//d `e para sobre escrever certo tipos de arquivos

import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      gray_100: string;
      gray_200: string;
      gray_300: string;
      gray_700: string;
      gray_800: string;
      gray_900: string;
      cyan_gray: string;
      background: string;
      yellow_green: string;
      green_900: string;
      red: string;
      white: string;
      shape: string;
      spinner: string;
    };
  }
}
