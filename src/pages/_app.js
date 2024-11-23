// import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from 'framer-motion';
import { Suspense } from "react";
import theme from "../styles/theme";
import Navbar from "./components/Navbar";

export default function App({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={<div>Loading Navbar...</div>}>
          <Navbar key={"navbar"} />
        </Suspense>
        <main style={{margin: "3rem"}}>
          <Component {...pageProps} key={router.route}/>
        </main>
      </AnimatePresence>
    </ChakraProvider>
  )
}
