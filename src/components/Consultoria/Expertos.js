import CustomLayout from "@/layout/CustomLayout";
import {
    HStack,
    Box,
    Heading,
    VStack,
    Text,
    Flex,
    Circle,
    SimpleGrid,
} from "@chakra-ui/react";
import Overlay from "../common/Overlay";
import GoldButton from "../common/GoldButton";

export default function Expertos() {
    return (
        <CustomLayout
            bg={"blue"}
            title={"NUESTROS EXPERTOS"}
            maxW={"100%"}
            arrowsColor={"white"}
        >
            {/* <Box w={"80%"}> */}
            <SimpleGrid
                my={{base:"3rem", xl: "6rem"}}
                columns={{ base: 1, xl: 4 }}
                spacingX={"3rem"} // 24px horizontal gap
                spacingY={"5rem"} // 16px vertical gap
                w={"100%"}
                // px={"5rem"}
            >
                <CardsContenido
                    author={"JOHN DOE"}
                    img={"face3.webp"}
                    title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                    text={`Exercitation quis sunt sunt non ad excepteur est consectetur incididunt. Sit nostrud do excepteur duis aliquip pariatur aliqua laborum veniam cillum ad motiv.`}
                    cta={"AGENDAR CONSULTA"}
                />

                <CardsContenido
                    author={"JOHN DOE"}
                    img={"face1.jpg"}
                    title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                    text={`Exercitation quis sunt sunt non ad excepteur est consectetur incididunt. Sit nostrud do excepteur duis aliquip pariatur aliqua laborum veniam cillum ad motiv.`}
                    cta={"AGENDAR CONSULTA"}
                />

                <CardsContenido
                    author={"JOHN DOE"}
                    img={"face.jpg"}
                    title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                    text={`Exercitation quis sunt sunt non ad excepteur est consectetur incididunt. Sit nostrud do excepteur duis aliquip pariatur aliqua laborum veniam cillum ad motiv.`}
                    cta={"AGENDAR CONSULTA"}
                />
            </SimpleGrid>
            {/* </Box> */}
        </CustomLayout>
    );
}

function CardsContenido({ author, img, title, text, cta }) {
    return (
        <VStack m={"auto"} width={{base:"20rem", md: "32rem"}} bg={"white"} color={"black"} py={"2rem"} px={"3rem"} boxShadow={"0px 1.5rem 20px rgba(0,0,0,0.3)"}>
            <Text mb={"1rem"}>{author}</Text>
            <Circle
                backgroundImage={`url('${img}')`}
                p={"6rem"}
                bgSize={"cover"}
                mb={"1rem"}
            />
            <Text as={"b"} mb={"0.5rem"}>
                {title}
            </Text>
            <Text size={"sm"} mb={"2rem"}>{text}</Text>
            <GoldButton>{cta}</GoldButton>
        </VStack>
    );
}
