import { Heading, HStack, VStack, Box, Text } from "@chakra-ui/react";
import SectionLayout from "@/layout/SectionLayout";
import GoldButton from "../common/GoldButton";

export default function QuienesSomos() {
    return (
        <SectionLayout maxW={"container.xl"} bg={"blue"} color={"white"}>
            <HStack>
                <VStack
                    w={"50%"}
                    align={"flex-start"}
                    px={"2rem"}
                    spacing={"2rem"}
                >
                    <Heading size={"3xl"} fontWeight={400} textAlign={"center"}>
                        QUIENES SOMOS
                    </Heading>
                    <Text mb={"0.3rem"}>
                        Desde Yucatán y Estados Unidos, con un conocimiento
                        profundo sobre el mercado inmobiliario, combinado con
                        una experiencia sólida en las más recientes innovaciones
                        tecnológicas y un entrenamiento de ventas inspirado en
                        las mejores prácticas de Estados Unidos, nuestro equipo
                        se unió para crear y ofrecer un valor excepcional a los
                        inmobiliarios.
                    </Text>
                    <Text mb={"0.5rem"}>
                        <>
                            {`Un ambiente enfocado en la excelencia, complementado con
                            estrategias actualizadas, herramientas innovadoras que
                            pocos conocen y menos saben manejar, y una red de
                            expertos en todos los aspectos de la industria. `}
                            <Text as={"span"} fontWeight={800} display={"inline"}>
                                Merivilla Co
                            </Text> 
                            {` está aquí para transformar negocios
                            inmobiliarios.`}
                        </>
                    </Text>

                    <GoldButton>SOBRE NOSOTROS</GoldButton>
                </VStack>

                <Box
                    bgImage={"url('/acerca.webp')"}
                    backgroundSize={"cover"}
                    w={"55%"}
                    h={"25rem"}
                    boxShadow={"-30px 30px 30px rgba(0,0,0,0.3)"}
                >
                    <Box
                        w={"100%"}
                        h={"100%"}
                        bgColor={"#cfcfcf"}
                        opacity={0.65}
                    />
                </Box>
            </HStack>
        </SectionLayout>
    );
}
