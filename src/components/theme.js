import { createText, createBox } from "@shopify/restyle";
import { moderateScale } from "react-native-size-matters";

const theme = {
  colors: {
    white: "#fff",
    primary: "#242C42",
    primary2: "#171E32",
    primary3: "#111526",
    primary4: "#323846",
    text: "#C5C5C9",
    green: "#08A94E",
    green1: "#7EC16C",
    blue: "#00D2FF",
    red: "#FF473D",
    brown: "#291720",
    silver: "#F3F1F2",
    silver1: "#718597",
    gray: '#E8E8E8',
    gray1: "#939393",
    gradient1: 'linear-gradient(to right bottom, #395e7e, #315472, #2a4a66, #22405a, #1b374f)'
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    title: {
      fontSize: moderateScale(35),
      fontFamily: "SFBOLD",
      color: "white",
    },
    title1: {
      fontSize: moderateScale(15),
      fontFamily: "SFBOLD",
      color: "white",
    },
    body: {
      fontSize: 16,
      lineHeight: 25,
      fontFamily: "SFREGULAR",
      color: "text",
    },
    button: {
      fontSize: 15,
      fontFamily: "SFSEMI",
      color: "text",
    },
  },
  breakpoints: {},
};

export const Text = createText();
export const Box = createBox();
export default theme;
