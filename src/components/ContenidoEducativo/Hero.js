import { Heading, Text, Flex, VStack } from "@chakra-ui/react";
import Overlay from "../common/Overlay";

export default function Hero() {
    return (
        <Flex
            bg={"blue"}
            width="100vw"
            height="100vh"
            backgroundImage="url('serv2.webp')"
            backgroundSize="cover"
            align={"center"}
            position={"relative"}
        >
            <Overlay color={"light"}/>

            <VStack
                align={"flex-start"}
                position={"relative"}
                color={"black"}
                w={"50%"}
                mt={"-8rem"}
                px={"8rem"}
            >
                <Heading mb={"0.8rem"}>
                    CAPACITACION Y CONOCIMIENTO
                </Heading>
                <Text w={"70%"} ml={"0.7rem"}>
                    Aqui aprenderas cosas mucho antes que nadie, refinete con
                    nuestro contenido y estaras adelante de tu competencia.
                </Text>
            </VStack>
        </Flex>
    );
}