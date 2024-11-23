// import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import Navbar from "./components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <main style={{margin: "3rem"}}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}
