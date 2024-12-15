import CustomLayout from "@/layout/CustomLayout";
import { Text, Box, Circle, Heading, HStack, VStack } from "@chakra-ui/react";
import { PiCrownSimpleFill } from "react-icons/pi";
import Overlay from "../common/Overlay";

export default function Videos() {
    return (
        <CustomLayout maxW="100%" bg={"white"} title={<CustomTitle />} arrowsCrolor="black">
            <HStack my={"6rem"} justify={"space-between"} w={"100%"} px={"5rem"}>
                <VideoCards
                    title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                    category={"VENTAS Y MARKETING"}
                    date={"01/01/2025"}
                    author={"John Doe"}
                    img={"serv1.jpg"}
                />

                <VideoCards
                    title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                    category={"VENTAS Y MARKETING"}
                    date={"01/01/2025"}
                    author={"John Doe"}
                    img={"serv1.jpg"}
                />

                <VideoCards
                    title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                    category={"VENTAS Y MARKETING"}
                    date={"01/01/2025"}
                    author={"John Doe"}
                    img={"serv1.jpg"}
                />
            </HStack>
        </CustomLayout>
    );
}

function VideoCards({ title, category, date, author, img }) {
    return (
        <VStack
            position={"relative"}
            py={"2rem"}
            px={"2rem"}
            w={"35rem"}
            bg={`url('${img}')`}
            bgSize={"cover"}
            boxShadow={"0px 1.5rem 20px rgba(0,0,0,0.3)"}
        >
            <Overlay color={"blue"} />
            <VStack
                justify={"space-between"}
                position={"relative"}
                color={"white"}
                h={"28rem"}
            >
                <VStack align={"flex-start"}>
                    <Heading size={"2xl"}>{title}</Heading>
                    <Text fontSize={"xl"}>{category}</Text>
                </VStack>

                <HStack
                    justify={"space-between"}
                    align={"center"}
                    w={"100%"}
                    fontSize={"2xl"}
                >
                    <HStack>
                        <Circle
                            bgGradient="linear(45deg, #9c6a07 0%,#dbb262 100%)"
                            display={"inline-flex"}
                            p={"0.4rem"}
                            mr={"0.3rem"}
                        >
                            <PiCrownSimpleFill
                                fontSize={"2rem"}
                                color="white"
                            />
                        </Circle>
                        <Text as={"b"}>{date}</Text>
                    </HStack>
                    <Text as={"b"}>{author}</Text>
                </HStack>
            </VStack>
        </VStack>
    );
}

function CustomTitle() {
    return (
        <>
            {"VIDEOS EDUCATIVOS"}
            <Circle
                bgGradient="linear(45deg, #9c6a07 0%,#dbb262 100%)"
                display={"inline-flex"}
                p={"0.4rem"}
                ml={"1rem"}
            >
                <PiCrownSimpleFill fontSize={"2.7rem"} color="white" />
            </Circle>
        </>
    );
}
