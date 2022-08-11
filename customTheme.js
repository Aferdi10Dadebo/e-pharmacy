import { extendTheme } from "native-base";

const customTheme = extendTheme({
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "light",
  },
  colors: {
    primary: {
      100: "#FFE7E7",
      200: "#FFCDCD",
      300: "#FF9F9F",
      400: "#ff5e4e",
      500: "#eb1c24",
      600: "#E8060F",
      700: "#C9060E",
      800: "#C9060E",
      900: "#C9060E",
    },
    secondary: {
      100: "#DDE0E4",
      200: "#BCBEC2",
      300: "#A0A2A4",
      400: "#838486",
      500: "#6D6E70",
      600: "#707072",
      700: "#4E4F50",
      800: "#4E4F50",
      900: "#4E4F50",
    },
    blue: {
      100: "#BCCBF9",
      200: "#9EB4F4",
      300: "#7593EF",
      400: "#567AE9",
      500: "#4169E1",
      600: "#5C53FD",
      700: "#4136FF",
      800: "#4136FF",
      900: "#4136FF",
    },
    green: {
      100: "#B5FFCE",
      200: "#9DFFBE",
      300: "#7FFDAA",
      400: "#70F49D",
      500: "#27B858",
      600: "#16B84D",
      700: "#0FAD45 ",
      800: "#0FAD45 ",
      900: "#0FAD45 ",
    },
    white: {
      100: "#fff",
      200: "#fff",
      300: "#fff",
      400: "#fff",
      500: "#fff",
      600: "#fff",
      700: "#fff ",
      800: "#fff ",
      900: "#fff ",
    },
    black: {
      100: "#CACCCF",
      200: "#B3B5B9",
      300: "#9E9FA1",
      400: "#818183",
      500: "#6D6E70",
      600: "#525457",
      700: "#37393C",
      800: "#37393C",
      900: "#37393C",
    },
  },
  components: {
    Text: {
      baseStyle: (props) => {
        return {
          fontFamily: "regular",
          color: "#6D6E70",
        };
      },
    },
    Heading: {
      baseStyle: (props) => {
        return {
          fontFamily: "semiBold",
          color: "#6D6E70",
        };
      },
    },
  },
});

export default customTheme;
