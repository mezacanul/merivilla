import {
    Box,
    Heading,
    Text,
    VStack,
    Flex,
    Image,
    HStack,
    Circle,
} from "@chakra-ui/react";

export default function Hero() {
    return (
        <>
            {/* Blog page intro  */}
            <Flex
                w={"100vw"}
                h={"70vh"}
                bg={"blue"}
                align={"center"}
                px={"5rem"}
            >
                <VStack
                    align={"flex-start"}
                    w={"60%"}
                    spacing={"2.5rem"}
                    mt={"-5rem"}
                >
                    <Text fontSize={"2xl"}>Blog</Text>
                    <Heading size={"4xl"}>Latest Insights</Heading>
                    <Text fontSize={"3xl"}>
                        Stay updated with the latest trends and insights from
                        our experts. Read our articles on various topics and
                        enhance your knowledge.
                    </Text>
                </VStack>
            </Flex>

            {/* Highlited Blog  */}
            <VStack mt={"-12.5rem"} px={"5rem"} align={"flex-start"}>
                <Image
                    src="/merida.jpg"
                    h={"45rem"}
                    w={"100%"}
                    m={"auto"}
                    objectFit={"cover"}
                />


                <VStack color={"black"} align={"flex-start"} py={"2rem"}>
                    <Text mb={"0.5rem"} color={"blue"} as={"b"} fontSize={"xl"}>
                        Industry Insights
                    </Text>
                    <Heading mb={"0.7rem"} size={"2xl"}>
                        The Future of SaaS: Trends to Watch in 2023
                    </Heading>
                    <Text color={"dark"} mb={"1.2rem"} fontSize={"2xl"}>
                        Discover the latest trends in SaaS that are shaping the
                        future of digital solutions and how your business can
                        benefit.
                    </Text>

                    <HStack>
                        <Circle
                            p={"2rem"}
                            bgImage={"/face.jpg"}
                            bgSize={"cover"}
                            me={"0.5rem"}
                        />

                        <VStack align={"self-start"} spacing={0}>
                            <Text fontSize={"xl"} as={"b"}>
                                John Doe
                            </Text>
                            <Text color={"dark"} fontSize={"xl"}>
                                January 15, 2023
                            </Text>
                        </VStack>
                    </HStack>
                </VStack>
            </VStack>
        </>
    );
}
