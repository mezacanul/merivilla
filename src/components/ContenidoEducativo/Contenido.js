import CustomLayout from "@/layout/CustomLayout";
import { HStack, Box, Heading, VStack, Text, Flex } from "@chakra-ui/react";
import Overlay from "../common/Overlay";

export default function Contenido() {
    return (
        <CustomLayout bg={"blue"} title={"CONTENIDO GRATIS"} maxW={"100%"} arrowsColor={"white"}>
            {/* <Box w={"80%"}> */}
                <HStack my={"6rem"} justify={"space-between"} w={"100%"} px={"5rem"}>
                    <CardsContenido 
                        title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                        subtitle={"VENTAS Y MARKETING"}
                        subtitleColor={"blue"}
                        text={`Aqui aprenderas cosas mucho antes que nadie, refinete
                            con nuestro contenido y estaras adelante de tu
                            competicion.`}
                        date={"01/01/2025"}
                        author={"Erick Góngora"}
                        img={"serv2.webp"}
                    />
                    
                    <CardsContenido 
                        title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                        subtitle={"VENTAS Y MARKETING"}
                        subtitleColor={"orange"}
                        text={`Aqui aprenderas cosas mucho antes que nadie, refinete
                            con nuestro contenido y estaras adelante de tu
                            competicion.`}
                        date={"01/01/2025"}
                        author={"Erick Góngora"}
                        img={"serv2.webp"}
                    />
                    
                    <CardsContenido 
                        title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                        subtitle={"VENTAS Y MARKETING"}
                        subtitleColor={"blue"}
                        text={`Aqui aprenderas cosas mucho antes que nadie, refinete
                            con nuestro contenido y estaras adelante de tu
                            competicion.`}
                        date={"01/01/2025"}
                        author={"Erick Góngora"}
                        img={"serv2.webp"}
                    />
                </HStack>
            {/* </Box> */}
        </CustomLayout>
    );
}

function CardsContenido({title, subtitle, subtitleColor, text, date, author, img}) {
    return (
        <VStack width={"36rem"} align={"center"}>
            {/* Image Box  */}
            <Box
                // backgroundImage="url('serv2.webp')"
                backgroundImage={`url('${img}')`}
                backgroundSize="cover"
                position={"relative"}
                h={"32rem"}
                p={"2rem"}
            >
                <Overlay color={"light"} />
                <Heading color={"black"} position={"relative"} size={"2xl"}>
                    {title}
                </Heading>
            </Box>

            {/* Content Box */}
            <VStack
                mt={"-7.5rem"}
                position={"relative"}
                bg={"white"}
                color={"black"}
                w={"90%"}
                p={"2rem"}
                // h={"18rem"}
                justifyContent={"space-between"}
                boxShadow={"0px 1.5rem 20px rgba(0,0,0,0.3)"}
            >
                <VStack mb={"3rem"}>
                    <Text fontSize={"2xl"} as={"b"} color={subtitleColor}>{subtitle}</Text>
                    <Text fontSize={"xl"}>
                        {text}
                    </Text>
                </VStack>

                {/* Footer  */}
                <HStack w={"100%"} justify={"space-between"} fontSize={"2xl"}>
                    <Text as="b">{date}</Text>
                    <Text as="b">{author}</Text>
                </HStack>
            </VStack>
        </VStack>
    );
}
