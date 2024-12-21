import {
    Heading,
    HStack,
    VStack,
    Circle,
    Text,
    Flex,
    Box,
    Stack,
    Grid,
    SimpleGrid,
} from "@chakra-ui/react";
import SectionLayout from "@/layout/SectionLayout";

export default function Testimoniales() {
    return (
        <SectionLayout
            // maxW={"container.xl"}
            bg={"blue"}
            color={"white"}
            py="6rem"
            maxW={"85%"}
        >
            <Heading textAlign={"center"}>TESTIMONIALES</Heading>

            <SimpleGrid
                columns={{ base: 1, md: 2, xl: 4 }}
                my={"4rem"}
                spacingX={"3rem"} // 24px horizontal gap
                spacingY={"3rem"} // 16px vertical gap
                justify={"space-between"}
                align={"stretch"}
                direction={{ base: "column", xl: "row" }}
            >
                <Testimonial
                    image={"url('/face1.jpg')"}
                    text={
                        '"El contenido educativo es impresionante. Técnicas avanzadas que al implementarlas nos llevaron a cerrar 50 ventas al mes en Mayo."'
                    }
                    name={"CEO de Empresa"}
                />

                <Testimonial
                    image={"url('/face2.jpg')"}
                    text={
                        '"Gracias a Merivilla Co, nuestro desarrollo será el más vendido este año en Aldea Zamá, Tulum."'
                    }
                    name={"CEO de Empresa"}
                />

                <Testimonial
                    image={"url('/face2.jpg')"}
                    text={
                        '"La asesoría con el Sr. Erick optimizó nuestro departamento de marketing, logrando generar leads de manera mucho más eficiente."'
                    }
                    name={"CEO de Empresa"}
                />

                <Testimonial
                    image={"url('/face3.webp')"}
                    text={
                        '"Ventaje es increíble... definitivamente nos ha dado una ventaja significativa sobre la competencia."'
                    }
                    name={"CEO de Empresa"}
                />
            </SimpleGrid>
        </SectionLayout>
    );
}

function Testimonial({ image, text, name }) {
    return (
        // <Box>
        <VStack
            textAlign={"center"}
            bg={"white"}
            color={"black"}
            py={["2rem", "2.5rem"]}
            px={"1rem"}
            boxShadow={"0px 20px 30px rgba(0,0,0,0.4)"}
        >
            <VStack justify={"flex-start"} h={"100%"}>
                <Circle
                    mb={"1rem"}
                    padding={"4rem"}
                    fontSize={"5rem"}
                    bgImage={image}
                    backgroundPosition={"center"}
                    backgroundSize={"cover"}
                    boxShadow={"0px 5px 10px rgba(39, 39, 39, 0.3)"}
                />
                <Text width={"90%"} as={"b"} size={"sm"} mb={"0.5rem"}>
                    {text}
                </Text>
            </VStack>
            <Text size={"sm"}>{name}</Text>
        </VStack>
        // </Box>
    );
}
