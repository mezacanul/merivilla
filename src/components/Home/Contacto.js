import {
    Box,
    Heading,
    HStack,
    VStack,
    FormControl,
    Input,
    Select,
    Text,
} from "@chakra-ui/react";
import SectionLayout from "@/layout/SectionLayout";
import { useEffect } from "react";
import { countries } from "countries-list";
import GoldButton from "../common/GoldButton";

export default function Contacto() {
    return (
        <SectionLayout
            maxW={"container.xl"}
            bg={"url(/formulario.webp)"}
            backdrop={true}
            backdropColor={"blue"}
            backdropOpacity={0.7}
            py={"15rem"}
        >
            <HStack justify={"space-between"}>
                <Formulario />
                <Informacion />
            </HStack>
        </SectionLayout>
    );
}

function Formulario() {
    return (
        <Box w={"40%"} px={"2rem"}>
            <VStack>
                <Heading size={"xl"} mb={"1.5rem"} fontWeight={400}>
                    INSCRIBETE HOY
                </Heading>

                <Box as="form" w={"100%"} color="black">
                    <FormControl id="name" mb={4} isRequired>
                        <Input fontSize={"1.3rem"} placeholder="NOMBRE" type="text" bg={"white"} textAlign={"center"} py={"1.5rem"}/>
                    </FormControl>

                    <FormControl id="apellido" mb={4} isRequired>
                        <Input
                            placeholder="APELLIDO"
                            type="text"
                            bg={"white"}
                            textAlign={"center"}
                            py={"1.5rem"}
                            fontSize={"1.3rem"}
                        />
                    </FormControl>

                    <FormControl id="telefono" mb={4} isRequired>
                        <HStack>
                            <Select height={"3rem"} fontSize={"1.3rem"} w={"25%"} bg={"white"} defaultValue={"MX"}>
                                {Object.keys(countries).map((key, i) => (
                                    <option key={`${i}${key}`} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </Select>

                            <Input
                                fontSize={"1.3rem"}
                                placeholder="TELEFONO"
                                type="tel"
                                bg={"white"}
                                py={"1.5rem"}
                            />
                        </HStack>
                    </FormControl>

                    <FormControl id="correo" mb={4} isRequired>
                        <Input fontSize={"1.3rem"} placeholder="CORREO" type="email" bg={"white"} textAlign={"center"}  py={"1.5rem"}/>
                    </FormControl>

                    <GoldButton w={"100%"} fontSize="lg">INSCRIBETE</GoldButton>
                </Box>
            </VStack>
        </Box>
    );
}

function Informacion() {
    return (
        <Box w={"55%"} mt={"-10rem"} px={"2rem"} alignItems={"flex-end"}>
            <VStack textAlign={"right"} mb={"2rem"} align={"flex-end"}>
                <Heading size={"3xl"} fontWeight={300}>
                    TU ULTIMA
                </Heading>
                <Heading size={"3xl"} fontWeight={700} mb={"1rem"}>
                    OPORTUNIDAD
                </Heading>
                <Text fontSize={"xl"} w={"90%"}>
                    El mercado está evolucionando, la tecnología esta avanzando,
                    y tus competidores ya están innovando. No te quedes atrás.
                    Nosotros estamos listos para ayudarte a transformar tu
                    negocio y asegurarte el éxito.
                </Text>
            </VStack>

            <VStack align={"flex-start"} fontSize={"1.6rem"} spacing={"1.8rem"}>
                <Text fontWeight={600} mb={"0.3rem"}>
                    +2528562398
                </Text>
                <Text fontWeight={600} mb={"0.3rem"}>
                    contacto@merivilla.co
                </Text>
                <Text fontWeight={600} mb={"0.3rem"}>
                    Calle 36a 308, San Ramon Norte
                </Text>
                <Text
                    fontWeight={600}
                    mb={"0.3rem"}
                    borderBottom={"1px"}
                    _hover={{ cursor: "pointer" }}
                >
                    Merivilla.com
                </Text>
                <Text
                    fontWeight={600}
                    mb={"0.3rem"}
                    borderBottom={"1px"}
                    _hover={{ cursor: "pointer" }}
                >
                    Ventaje.com
                </Text>
            </VStack>
        </Box>
    );
}
