import "../styles/swiper_custom.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import theme from "../styles/theme";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import { useDisclosure } from "@chakra-ui/react";
import DrawerMenu from "@/components/Shared/Drawer";
import { Provider } from "react-redux";
import { store } from "../store"; // Create this file
import Head from "next/head";
import { useEffect } from "react";

export default function App({ Component, pageProps, router }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        console.log("Current PATH: ", router.route);
    }, [router.route]);

    return (
        <>
            <Head>
                <title>{"Merivilla.co"}</title>
            </Head>
            <Provider store={store}>
                <ChakraProvider theme={theme}>
                    {/* <AnimatePresence mode="wait" initial={true}> */}
                    <Header key={"Header"} onOpen={onOpen} />

                    <main>
                        <Component {...pageProps} key={router.route} />
                    </main>
                    <DrawerMenu isOpen={isOpen} onClose={onClose} />

                    <Footer key={"Footer"} />
                    {/* </AnimatePresence> */}
                </ChakraProvider>
            </Provider>
        </>
    );
}
