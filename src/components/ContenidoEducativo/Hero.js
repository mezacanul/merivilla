import { Heading, Text, Flex, VStack, Box } from "@chakra-ui/react";

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
            <Overlay color={"light"} />

            <VStack
                align={"flex-start"}
                position={"relative"}
                color={"black"}
                w={"50%"}
                mt={"-8rem"}
                px={"8rem"}
            >
                <Heading fontWeight={500} size={"3xl"} mb={"0.8rem"}>
                    CAPACITACION Y CONOCIMIENTO
                </Heading>
                <Text w={"90%"} fontSize={"1.3rem"} fontWeight={500}>
                    Aqui aprenderas cosas mucho antes que nadie, refinete con
                    nuestro contenido y estaras adelante de tu competencia.
                </Text>
            </VStack>
        </Flex>
    );
}

function Overlay({ color, opacity = 0.7 }) {
    return (
        <Box
            position={"absolute"}
            width="100%"
            height="100%"
            top="0"
            left="0"
            background={color}
            opacity={opacity}
        />
    );
}
