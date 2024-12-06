import { Heading, HStack, VStack, Circle, Text } from "@chakra-ui/react";
import SectionLayout from "@/layout/SectionLayout";

export default function Testimoniales() {
    return (
        <SectionLayout maxW={"container.xl"} bg={"#527894"} color={"white"} py="5rem">
            <Heading size={"3xl"} textAlign={"center"} fontWeight={400}>
                TESTIMONIALES
            </Heading>

            <HStack spacing={"6rem"} my={"7rem"}>
                <Testimonial
                    image={"url('/face1.jpg')"}
                    text={
                        '"Anim in nulla tempor consectetur. Dolore proident velit aute do exercitation elit consequat. Anim in nulla tempor consectetur."'
                    }
                    name={"CEO de Empresa"}
                />
                <Testimonial
                    image={"url('/face2.jpg')"}
                    text={
                        '"Anim in nulla tempor consectetur. Dolore proident velit aute do exercitation elit consequat. Anim in nulla tempor consectetur."'
                    }
                    name={"CEO de Empresa"}
                />
                <Testimonial
                    image={"url('/face3.webp')"}
                    text={
                        '"Anim in nulla tempor consectetur. Dolore proident velit aute do exercitation elit consequat. Anim in nulla tempor consectetur."'
                    }
                    name={"CEO de Empresa"}
                />
            </HStack>
        </SectionLayout>
    );
}

function Testimonial({ image, text, name }) {
    return (
        <VStack textAlign={"center"} bg={"white"} color={"black"} py={"3.5rem"} px={"1rem"} boxShadow={"0px 20px 30px rgba(0,0,0,0.4)"}>
            <Circle
                mb={"1rem"} padding={"4rem"}
                fontSize={"5rem"}
                bgImage={image}
                backgroundPosition={"center"}
                backgroundSize={"cover"}
            />
            <Text width={"80%"} fontWeight={"800"} fontSize={"sm"} mb={"1rem"}>
                {text}
            </Text>
            <Heading fontSize="md" fontWeight={400}>
                {name}
            </Heading>
        </VStack>
    );
}
