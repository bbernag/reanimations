import { createTheme } from "@shopify/restyle";

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  black: "#0B0B0B",
  background: "#0B0B0B",
  foreground: "#C1C5C8",
  white: "#F0F2F3",
};

const theme = createTheme({
  colors: {
    ...palette,
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
    auto: "auto",
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      color: "foreground",
    },
  },
  cardVariants: {
    defaults: {
      backgroundColor: "greenDark",
    },
  },
  boxVariants: {
    defaults: {
      backgroundColor: "background",
    },
    card: {
      padding: "md",
      backgroundColor: "greenDark",
    },
  },
});

export type Theme = typeof theme;
export default theme;
