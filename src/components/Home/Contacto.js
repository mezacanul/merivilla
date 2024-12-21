import {
    Box,
    Heading,
    HStack,
    VStack,
    FormControl,
    Input,
    Select,
    Text,
    Stack,
} from "@chakra-ui/react";
import SectionLayout from "@/layout/SectionLayout";
import { countries } from "countries-list";
import GoldButton from "../common/GoldButton";
import { useState } from "react";
import {Link as NextLink} from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Contacto() {
    return (
        <SectionLayout
            name={"contacto"}
            maxW={"container.xl"}
            bg={"url(/formulario.webp)"}
            backdrop={true}
            backdropColor={"blue"}
            backdropOpacity={0.7}
            py={["10rem", "15rem"]}
        >
            <Stack justify={"space-between"} direction={["column-reverse", "row"]}>
                <Formulario />
                <Informacion />
            </Stack>
        </SectionLayout>
    );
}

function Formulario() {
    const [submitted, setSubmitted] = useState(false)

    return (
        <Box w={["100%", "40%"]} px={"2rem"}>
            {(submitted == true) &&
                <VStack color={"white"} spacing={2} fontWeight={"bold"}>
                    <Text>!Gracias por inscribirte!</Text>
                    <Text size={"sm"}>En breve nos comunicaremos contigo</Text>
                </VStack>
            }

            {(submitted == false) &&  
                <VStack>
                    <Heading textAlign={"center"} size={"sm"} mb={"1.5rem"} fontWeight={400}>
                        INSCRIBETE HOY
                    </Heading>
                    
                    <Box as="form" w={"100%"} color="black">
                        <FormControl id="name" mb={4} isRequired>
                            <Input
                                placeholder="NOMBRE"
                                type="text"
                                bg={"white"}
                                textAlign={"center"}
                                py={"1.5rem"}
                            />
                        </FormControl>

                        <FormControl id="apellido" mb={4} isRequired>
                            <Input
                                placeholder="APELLIDO"
                                type="text"
                                bg={"white"}
                                textAlign={"center"}
                                py={"1.5rem"}
                            />
                        </FormControl>

                        <FormControl id="telefono" mb={4} isRequired>
                            <HStack>
                                <Select
                                    height={"3rem"}
                                    w={"25%"}
                                    bg={"white"}
                                    defaultValue={"MX"}
                                >
                                    {Object.keys(countries).map((key, i) => (
                                        <option key={`${i}${key}`} value={key}>
                                            {key}
                                        </option>
                                    ))}
                                </Select>

                                <Input
                                    placeholder="TELEFONO"
                                    type="tel"
                                    bg={"white"}
                                    py={"1.5rem"}
                                />
                            </HStack>
                        </FormControl>

                        <FormControl id="correo" mb={4} isRequired>
                            <Input
                                placeholder="CORREO"
                                type="email"
                                bg={"white"}
                                textAlign={"center"}
                                py={"1.5rem"}
                            />
                        </FormControl>

                        <GoldButton w={"100%"} onClick={()=>{setSubmitted(true)}}>INSCRIBETE</GoldButton>
                    </Box>
                </VStack>
            }
        </Box>
    );
}

function Informacion() {
    return (
        <Box w={["100%", "55%"]} mt={["0", "-10rem"]} px={"2rem"} alignItems={"flex-end"} mb={["2rem", "0"]}>
            <VStack textAlign={"right"} mb={"2rem"} align={"flex-end"}>
                <Heading fontWeight={300}>TU ULTIMA</Heading>
                <Heading fontWeight={"bold"} mb={"1rem"}>
                    OPORTUNIDAD
                </Heading>
                <Text fontSize={"xl"} w={"90%"}>
                    El mercado está evolucionando, la tecnología esta avanzando,
                    y tus competidores ya están innovando. No te quedes atrás.
                    Nosotros estamos listos para ayudarte a transformar tu
                    negocio y asegurarte el éxito.
                </Text>
            </VStack>

            <VStack align={["center", "flex-start"]} spacing={"1.4rem"}>
                <ChakraLink {...(styles.chakraLink)} as={NextLink} href="tel:+2528562398">
                    +2528562398
                </ChakraLink>
                <ChakraLink {...(styles.chakraLink)} as={NextLink} href="mailto:contacto@merivilla.co">
                    contacto@merivilla.co
                </ChakraLink>
                <ChakraLink {...(styles.chakraLink)} as={NextLink} href="https://maps.app.goo.gl/wXqBB6WEHahZ5r5p6" target="_blank">
                    Calle 36a 308, San Ramon Norte
                </ChakraLink>
                <ChakraLink
                    {...(styles.chakraLink)} 
                    as={NextLink} 
                    href="/"
                    borderBottom={"1px"}
                    _hover={{ cursor: "pointer" }}
                >
                    Merivilla.com
                </ChakraLink>
                <ChakraLink
                    {...(styles.chakraLink)} 
                    as={NextLink} 
                    href="https://ventaje.com"
                    target="_blank"
                    borderBottom={"1px"}
                    _hover={{ cursor: "pointer" }}
                >
                    Ventaje.com
                </ChakraLink>
            </VStack>
        </Box>
    );
}

const styles = {
    chakraLink: {
        fontSize: "1.4rem",
        fontWeight: "bold"
    }
}
