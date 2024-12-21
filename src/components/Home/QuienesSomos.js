import { Heading, HStack, VStack, Box, Text, Stack } from "@chakra-ui/react";
import SectionLayout from "@/layout/SectionLayout";
import GoldButton from "../common/GoldButton";

export default function QuienesSomos() {
    return (
        <SectionLayout maxW={"85%"} bg={"blue"} color={"white"} py="7rem">
            <Heading textAlign={"left"} mb={{base: "2rem", xl: "1rem"}}>
                QUIENES SOMOS
            </Heading>
            <Stack direction={{base:"column-reverse", xl:"row"}} align={"center"}>
                <VStack
                    w={{base:"100%", xl: "50%"}}
                    align={"flex-start"}
                    // px={"2rem"}
                    spacing={"2rem"}
                    mr={{base:"", xl: "4rem"}}
                >
                    <Text size={{base:"sm", md: "md"}} mb={"0.3rem"}>
                        Desde Yucatán y Estados Unidos, con un conocimiento
                        profundo sobre el mercado inmobiliario, combinado con
                        una experiencia sólida en las más recientes innovaciones
                        tecnológicas y un entrenamiento de ventas inspirado en
                        las mejores prácticas de Estados Unidos, nuestro equipo
                        se unió para crear y ofrecer un valor excepcional a los
                        inmobiliarios.
                    </Text>
                    <Text size={{base:"sm", md: "md"}} mb={"0.5rem"}>
                        <>
                            {`Un ambiente enfocado en la excelencia, complementado con
                            estrategias actualizadas, herramientas innovadoras que
                            pocos conocen y menos saben manejar, y una red de
                            expertos en todos los aspectos de la industria. `}
                            <Text size={{base:"sm", md: "md"}} as={"b"} display={"inline"}>
                                Merivilla Co
                            </Text> 
                            {` está aquí para transformar negocios
                            inmobiliarios.`}
                        </>
                    </Text>

                    <GoldButton href={"nosotros"}>SOBRE NOSOTROS</GoldButton>
                </VStack>

                <Box
                    bgImage={"url('/acerca.webp')"}
                    backgroundSize={"cover"}
                    w={{base:"100%", xl: "50%"}}
                    h={["20rem", "35rem"]}
                    mb={{base:"1.5rem", xl: "0"}}
                    boxShadow={{base:"none", xl: "-30px 30px 30px rgba(0,0,0,0.3)"}}
                >
                    <Box
                        w={"100%"}
                        h={"100%"}
                        bgColor={"#cfcfcf"}
                        opacity={0.65}
                    />
                </Box>
            </Stack>
        </SectionLayout>
    );
}
