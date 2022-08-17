import { extendTheme } from "native-base";

const customTheme = extendTheme({
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "light",
  },
  colors: {
    primary: {
      100: "#ffb2c8",
      200: "#ff99b5",
      300: "#ff6691",
      400: "#ff326c",
      500: "#FF0048",
      600: "#ff326c",
      700: "#b20032",
      800: "#99002b",
      900: "#7f0024",
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
          fontFamily: "semibold",
          color: "#6D6E70",
        };
      },
    },
  },
});

export default customTheme;
