// import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from 'framer-motion';
// import { Suspense, lazy } from "react";
import theme from "../styles/theme";
// const Navbar = lazy(() => import("./components/Navbar"));
import Navbar from "./components/Navbar";

export default function App({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence mode="wait" initial={true}>
        <Navbar key={"navbar"} />
        <main style={{margin: "3rem"}}>
          <Component {...pageProps} key={router.route}/>
        </main>
      </AnimatePresence>
    </ChakraProvider>
  )
}
