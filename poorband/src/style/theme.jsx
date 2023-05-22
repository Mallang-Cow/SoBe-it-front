import { css } from "styled-components";

const colors = {
  white: "#FFFFFF",
  lightgrey_1: "#EDEDED",
  lightgrey_2: "#C4C4C4",
  grey: "",
  darkgrey_1: "#828282",
  darkgrey_2: "#696969",
  darkgrey_3: "",
  lightpurple: "#F1EBFA",
  darkpurple: "#F5F4F6",
  mainpurple: "#845EC2",
  black: "#000000",
};

const fonts = {
  bold: css`
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.03em;
  `,
  medium: css`
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.03em;
  `,
  regular: css`
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.03em;
  `,
  light: css`
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 300;
    letter-spacing: 0.03em;
  `,
};

const shadows = {
  card: css`
    box-shadow: 0 1.3rem 4rem rgba(170, 170, 170, 0.2);
  `,
};

export const theme = {
  colors,
  fonts,
  shadows,
};
