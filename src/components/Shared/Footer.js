import { Box, Container, HStack, Text } from "@chakra-ui/react";
import { ChakraNextLink as Link } from "../common/ChakraNextLink";

const Divider = () => {
    return <Text fontWeight={"600"} _hover={{cursor: "default"}}>|</Text>;
};

export default function Footer() {
    return (
        <Box bg={"black"} px={"6rem"} pt={"5rem"} pb={"6rem"}>
            <Container>
                <HStack
                    justify={"center"}
                    spacing={"0.8rem"}
                    fontSize={"0.9rem"}
                    mb={"2rem"}
                >
                    <Link href={"#"}>POLITICA DE PRIVACIDAD</Link>
                    <Divider />
                    <Link href={"#"}>TERMINOS DE USO</Link>
                    <Divider />
                    <Link href={"#"}>TRABAJO</Link>
                    <Divider />
                    <Text
                        bgGradient="linear(to-r, #671ac5, #a081ff)"
                        bgClip="text"
                        fontWeight={"800"}
                    >
                        <Link href={"#"}>
                            VENTAJE
                        </Link>
                    </Text>
                </HStack>
                {/* <Text fontSize={"0.9rem"} textAlign={"center"}>Merivilla 2024 ©</Text> */}
            </Container>
        </Box>
    );
}
