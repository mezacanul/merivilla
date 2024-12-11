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
        softBlue: "#8a97ad"
    },
    styles: {
        global: {
            body: {
                bg: "white",
                color: "white",
            },
        },
    },
});

export default theme;
