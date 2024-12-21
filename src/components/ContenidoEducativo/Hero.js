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
                w={{base:"100%", xl: "50%"}}
                px={{base:"1rem", md: "4rem", lg: "6rem", xl: "8rem"}}
                mt={"-8rem"}
            >
                <Heading size={{base:"md", lg: "lg", xl: "xl"}} mb={"0.8rem"}>
                    CAPACITACION Y CONOCIMIENTO
                </Heading>
                <Text w={{base:"70%", xl: "100%"}} ml={"0.7rem"} size={{base:"sm", md: "md", xl: "lg"}}>
                    Aqui aprenderas cosas mucho antes que nadie, refinete con
                    nuestro contenido y estaras adelante de tu competencia.
                </Text>
            </VStack>
        </Flex>
    );
}