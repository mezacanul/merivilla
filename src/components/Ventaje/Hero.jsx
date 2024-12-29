import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import GoldButton from "../common/GoldButton";
import blueGradient from "@/styles/blueGradient";

export default function Hero() {
    return (
        <Flex
            direction="column"
            justifyContent={"center"}
            align={"center"}
            w={"100vw"}
            h={"100vh"}
            {...blueGradient}
        >
            <VStack mt={"-5rem"}>
                <Heading
                    letterSpacing={"1.5rem"}
                    size={"xl"}
                    fontWeight={"200"}
                >
                    {"BIENVENIDOS A "}
                    <Heading
                        color={"lightBlue"}
                        as={"b"}
                        fontWeight={"700"}
                        // bgGradient={
                        //     // "linear-gradient(45deg, #644609 10%, #f6b431 50%) 1"
                        //     "linear-gradient(45deg, #9c6a07 0%,#dbb262 60%) 1"
                        // }
                        // bgClip={"text"}
                    >
                        VENTAJE
                    </Heading>
                </Heading>
                <Text my={"3rem"} fontWeight={"400"}>
                    <Text as={"b"}>MERIVILLA CO</Text>
                    {" PRESENTA EL SOFTWARE / AGENCIA MAS AVANZADO DEL MERCADO"}
                </Text>
            </VStack>
            <HStack spacing={"2rem"}>
                <GoldButton>AGENDAR DEMO</GoldButton>
                <GoldButton variant="outline">CONTACTAR HOY</GoldButton>
            </HStack>
        </Flex>
    );
}
