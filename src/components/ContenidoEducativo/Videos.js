import CustomLayout from "@/layout/CustomLayout";
import { Text, Box, Circle, Heading, HStack, VStack } from "@chakra-ui/react";
import { PiCrownSimpleFill } from "react-icons/pi";
import Overlay from "../common/Overlay";
import scaleEffect from "@/utils/scaleEffect";

export default function Videos() {
    return (
        <CustomLayout maxW="100%" bg={"white"} title={<CustomTitle />} arrowsCrolor="black">
            <HStack my={{base:"3rem", xl: "6rem"}} justify={"center"} w={"100%"} px={"1rem"}>
                
                <VideoCards
                    title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                    category={"VENTAS Y MARKETING"}
                    date={"01/01/2025"}
                    author={"John Doe"}
                    img={"serv1.jpg"}
                />

                {/* <VideoCards
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
                /> */}

            </HStack>
        </CustomLayout>
    );
}

function VideoCards({ title, category, date, author, img }) {
    return (
        <VStack
            {...scaleEffect}
            position={"relative"}
            py={"2rem"}
            px={"2rem"}
            w={{base:"20rem", md: "32rem", lg: "38rem"}}
            bg={`url('${img}')`}
            bgSize={"cover"}
            boxShadow={"0px 1.5rem 20px rgba(0,0,0,0.3)"}
        >
            <Overlay color={"blue"} />
            <VStack
                justify={"space-between"}
                position={"relative"}
                color={"white"}
                h={{base:"22rem", md: "28rem"}}
            >
                <VStack align={"flex-start"}>
                    <Heading fontWeight={"bold"} size={"md"}>{title}</Heading>
                    <Text size={"sm"}>{category}</Text>
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
                                fontSize={"1.5rem"}
                                color="white"
                            />
                        </Circle>
                        <Text size={"sm"} as={"b"}>{date}</Text>
                    </HStack>
                    <Text size={"sm"} as={"b"}>{author}</Text>
                </HStack>
            </VStack>
        </VStack>
    );
}

function CustomTitle() {
    return (
        <HStack color={"black"} justify={"flex-start"} align={{base:"flex-end", md: "center"}}>
            <Heading as={"span"}>
                VIDEOS EDUCATIVOS
            </Heading>
            <Circle
                bgGradient="linear(45deg, #9c6a07 0%,#dbb262 100%)"
                display={"inline-flex"}
                p={"0.4rem"}
                ml={"1rem"}
                mb={"0.4rem"}
            >
                <Text size={{base:"sm", md: "md", xl: "xl"}}>
                    <PiCrownSimpleFill color="white" />
                </Text>
            </Circle>
        </HStack>
    );
}
