import blueGradient from "@/styles/blueGradient";
import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";

export default function CustomLayout({ number, title, text, img, children, direction}) {
    return (
        <>
            <Box py={"2rem"} bg={"black"}>
                <HStack w={"75%"} mx={"auto"} flexDir={direction == "left" ? "row-reverse" : "row"}>
                    <VStack
                        w={"45%"}
                        textAlign={"center"}
                        position={"relative"}
                    >
                        <Heading
                            position={"absolute"}
                            top={"-5rem"}
                            left={direction == "left" ? "initial" : "-1rem"}
                            right={direction == "left" ? "-1rem" : "initial"}
                            fontWeight={"700"}
                            bgGradient={
                                // "linear-gradient(-45deg, #644609 10%, #f6b431 50%) 1"
                                "linear-gradient(45deg, #9c6a07 0%,#dbb262 80%) 1"
                            }
                            bgClip={"text"}
                        >
                            {number}
                        </Heading>
                        <Heading letterSpacing={"0.5rem"} mb={"1rem"}>
                            {title}
                        </Heading>
                        <Text w={"80%"}>{text}</Text>
                    </VStack>

                    <Image
                        mb={"-2rem"}
                        objectFit={"contain"}
                        maxH={"40rem"}
                        w={"55%"}
                        src={img}
                    />
                </HStack>
            </Box>

            <Box {...blueGradient}>
                <HStack w={"90%"} justify={"space-between"} py={"5rem"} mx={"auto"}>
                    {children}
                </HStack>
            </Box>
        </>
    );
}
