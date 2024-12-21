import { Heading, Text, Flex, VStack } from "@chakra-ui/react";
import Overlay from "../common/Overlay";

export default function Hero() {
    return (
        <Flex
            bg={"blue"}
            width="100vw"
            height="100vh"
            backgroundImage="url('serv1-mirror.jpg')"
            backgroundSize="cover"
            backgroundPosition={"center"}
            align={"center"}
            position={"relative"}
        >
            <Overlay color={"light"} />

            <VStack
                align={"flex-start"}
                position={"relative"}
                color={"black"}
                w={{base:"100%", xl: "50%"}}
                px={{base:"1rem", md: "4rem", lg: "6rem", xl: "8rem"}}
                mt={"-8rem"}
            >
                <Heading mb={"0.8rem"}>
                    CONSULTA CON NUESTROS EXPERTOS
                </Heading>
                <Text
                    w={"70%"}
                    ml={"0.7rem"}
                >
                    Consulta con nuestros expertos mas profesionales, calmados.
                    ve sus perfiles para ver que ofrecen, unos te pueden ofrecer
                    hasta certificados para tu empresa.
                </Text>
            </VStack>
        </Flex>
    );
}
