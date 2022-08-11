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
