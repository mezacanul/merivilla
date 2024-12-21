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
            pt={{base:"10rem", xl: "20rem"}}
        >
            <Stack spacing={"2rem"} direction={{base:"column-reverse", xl: "row"}}>
                <Formulario />
                <Informacion />
            </Stack>
        </SectionLayout>
    );
}

function Formulario() {
    const [submitted, setSubmitted] = useState(false)

    return (
        <Box w={{base:"100%", md: "70%", xl: "55%"}} px={"2rem"} margin={"auto"}>
            {(submitted == true) &&
                <VStack color={"white"} spacing={2} fontWeight={"bold"}>
                    <Text>!Gracias por inscribirte!</Text>
                    <Text size={"sm"}>En breve nos comunicaremos contigo</Text>
                </VStack>
            }

            {(submitted == false) &&  
                <VStack>
                    <Heading textAlign={"center"} size={{base:"sm", md: "md", lg: "lg", xl: "lg"}} mb={"1.5rem"} fontWeight={400}>
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
        <Box w={{base:"100%", xl: "55%"}} mt={{xl: "-10rem"}} px={"2rem"} alignItems={"flex-end"} mb={{base:"2rem", xl: "0"}}>
            <VStack textAlign={"right"} mb={"2rem"} align={{base:"center", xl: "flex-end"}}>
                <Heading fontWeight={300}>TU ULTIMA</Heading>
                <Heading fontWeight={"bold"} mb={"1rem"}>
                    OPORTUNIDAD
                </Heading>
                <Text size={{base:"sm", md: "md", lg: "lg"}} w={"90%"} textAlign={{base:"center", xl: "right"}}>
                    El mercado está evolucionando, la tecnología esta avanzando,
                    y tus competidores ya están innovando. No te quedes atrás.
                    Nosotros estamos listos para ayudarte a transformar tu
                    negocio y asegurarte el éxito.
                </Text>
            </VStack>

            <VStack align={{base:"center", xl: "flex-start"}} spacing={{base:"1.2rem", md: "1rem"}}>
                <ChakraLink {...(styles.chakraLink)} as={NextLink} href="tel:+2528562398">
                    <Text size={{base:"sm", md: "md"}}>
                        +2528562398
                    </Text>
                </ChakraLink>
                <ChakraLink {...(styles.chakraLink)} as={NextLink} href="mailto:contacto@merivilla.co">
                    <Text size={{base:"sm", md: "md"}}>
                        contacto@merivilla.co
                    </Text>
                </ChakraLink>
                <ChakraLink textAlign={"center"} {...(styles.chakraLink)} as={NextLink} href="https://maps.app.goo.gl/wXqBB6WEHahZ5r5p6" target="_blank">
                    <Text size={{base:"sm", md: "md"}}>
                        Calle 36a 308, San Ramon Norte
                    </Text>
                </ChakraLink>
                <ChakraLink
                    {...(styles.chakraLink)} 
                    as={NextLink} 
                    href="/"
                    borderBottom={"1px"}
                    _hover={{ cursor: "pointer" }}
                >
                    <Text size={{base:"sm", md: "md"}}>
                        Merivilla.com
                    </Text>
                </ChakraLink>
                <ChakraLink
                    {...(styles.chakraLink)} 
                    as={NextLink} 
                    href="https://ventaje.com"
                    target="_blank"
                    borderBottom={"1px"}
                    _hover={{ cursor: "pointer" }}
                >
                    <Text size={{base:"sm", md: "md"}}>
                        Ventaje.com
                    </Text>
                </ChakraLink>
            </VStack>
        </Box>
    );
}

const styles = {
    chakraLink: {
        // size: "lg",
        fontWeight: "bold"
    }
}
