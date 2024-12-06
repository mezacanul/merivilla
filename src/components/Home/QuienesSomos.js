import { Heading, HStack, VStack, Box, Text } from "@chakra-ui/react";
import SectionLayout from "@/layout/SectionLayout";
import GoldButton from "../common/GoldButton";

export default function QuienesSomos() {
    return (
        <SectionLayout maxW={"container.xl"} bg={"#527894"} color={"white"}>
            <HStack>
                <VStack w={"50%"} align={"flex-start"} px={"2rem"} spacing={"2rem"}>
                    <Heading size={"3xl"} fontWeight={400} textAlign={"center"}>
                        QUIENES SOMOS
                    </Heading>
                    <Text mb={"0.5rem"}>
                        Duis amet minim sunt mollit nostrud id est non nulla in
                        dolore est culpa qui. Reprehenderit enim consequat
                        exercitation cillum. Proident in do pariatur tempor
                        exercitation. Dolor elit cupidatat voluptate occaecat
                        non nulla ut velit id incididunt ullamco exercitation
                        Lorem. Eu nulla adipisicing est culpa nulla nulla.
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
                        bgColor={"#527894"}
                        opacity={0.65}
                    />
                </Box>
            </HStack>
        </SectionLayout>
    );
}
