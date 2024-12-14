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
            align={"center"}
            position={"relative"}
        >
            <Overlay color={"light"} />

            <VStack
                align={"flex-start"}
                position={"relative"}
                color={"black"}
                w={"50%"}
                mt={"-8rem"}
                px={"8rem"}
            >
                <Heading fontWeight={300} size={"4xl"} mb={"0.8rem"}>
                    CONSULTA CON NUESTROS EXPERTOS
                </Heading>
                <Text
                    w={"70%"}
                    fontSize={"1.8rem"}
                    fontWeight={500}
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