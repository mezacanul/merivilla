// Create a custom theme
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: "Montserrat Black, sans-serif",
        body: "Montserrat, sans-serif",
    },
    colors: {
        black: "#151515",
        dark: "#242424",
        light: "#D9D9D9",
        white: "#FFFFFF",
        blue: "#66738D",
        softBlue: "#8a97ad",
        gold: "linear(45deg, #9c6a07 0%,#dbb262 100%)",
        gradients: {
          gold: "linear(45deg, #9c6a07 0%,#dbb262 100%)",
        }
    },
    styles: {
        global: {
            body: {
                bg: "white",
                color: "white",
            },
        },
    },
    components: {
        Dashboard: {
          baseStyle: {
            color: "black", // Default text color for the Dashboard
          },
        },
        Text: {
          baseStyle: {
            // fontSize: "md", // Default size for Text
          },
          sizes: {
            sm: { fontSize: "18px" },
            md: { fontSize: "24px" }, // Default when fontSize="md"
            lg: { fontSize: "32px" },
            xl: { fontSize: "38px" },
          },
          defaultProps: {
            size: "md", // Set the default size
          },
        },
        Heading: {
          baseStyle: {
            fontWeight: "400", // Default style for headings
          },
          sizes: {
            sm: { fontSize: "34px" },
            md: { fontSize: "40px" }, // Default when fontSize="md"
            lg: { fontSize: "56px" },
            xl: { fontSize: "72px" },
          },
          defaultProps: {
            size: "lg", // Default size for headings
          },
        },
    },
});

export default theme;
