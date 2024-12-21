import {
    Flex,
    HStack,
    Text,
    VStack,
    FormControl,
    Input,
    FormLabel,
    Box,
    Button,
    InputGroup,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import GoldButton from "@/components/common/GoldButton";
import Link from "next/link";

export default function Login() {
    return (
        <Flex
            justify={"center"}
            align={"center"}
            w={"100vw"}
            h={"100vh"}
            color={"black"}
        >
            {/* Contenedor  */}
            <VStack w={"28rem"} spacing={"2rem"} mt={"-4rem"}>
                {/* Titulo  */}
                <Box>
                    <HStack justify={"center"}>
                        <Text size={{base:"md", md: "lg", xl: "xl"}} fontWeight={"light"}>Bienvenido a </Text>
                        <Text size={{base:"md", md: "lg", xl: "xl"}} as={"b"}>Merivilla.co</Text>
                    </HStack>
                    <Text textAlign={"center"} color={"dark"} w={{base:"80%", md: "100%"}} m={"auto"}>
                        <Text as={"span"} size={{base:"sm", xl: "md"}}>
                            Inicia sesión para continuar o puedes crear una
                            cuenta{" "}
                        </Text>
                        <Link href={"/onboard"}>
                            <Text
                                as={"b"}
                                size={{base:"sm", xl: "md"}}
                                _hover={{
                                    textDecor: "underline"
                                }}
                            >
                                aquí
                            </Text>
                        </Link>
                    </Text>
                </Box>

                {/* Formulario  */}
                <VStack w={{base:"80%", xl: "100%"}} align={"self-start"}>
                    <InputGroup>
                        <VStack w={"100%"}>
                            <FormControl id="email" mb={4}>
                                <FormLabel fontWeight={"bold"}>Email</FormLabel>
                                <Input
                                    borderColor={"dark"}
                                    placeholder="your@email.com"
                                    type="text"
                                    bg={"white"}
                                    py={"1.5rem"}
                                />
                            </FormControl>

                            <FormControl id="password" mb={4}>
                                <FormLabel fontWeight={"bold"}>
                                    Password
                                </FormLabel>
                                <Input
                                    borderColor={"dark"}
                                    placeholder="********"
                                    type="password"
                                    bg={"white"}
                                    py={"1.5rem"}
                                />
                            </FormControl>
                        </VStack>
                    </InputGroup>

                    <ChakraLink
                        as={Link}
                        href={"/recuperarcontrasena"}
                        mb={"2rem"}
                        _hover={{
                            textDecor: "underline"
                        }}
                    >
                        Olvide la contraseña
                    </ChakraLink>

                    <GoldButton  href={"/dashboard"} alignSelf={"center"}>Iniciar Sesión</GoldButton>
                </VStack>
            </VStack>
        </Flex>
        // <ComingSoon/>
    );
}
