import hexToRgba from "@/utils/hexToRgba";
import { Box, Container, Flex, Heading, HStack } from "@chakra-ui/react";
import { BiSolidDownArrow } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useTheme } from "@chakra-ui/react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";


export default function CustomLayout({ children, title, bg, maxW = "80%", arrowsCrolor = "white"}) {
    const theme = useTheme();
    let bgColor = theme.colors[bg]
    let arrowsBg = hexToRgba(bgColor, 0.9)

    return (
        <Box
            bg={bg}
            // py={"5rem"}
            color={bg == "white" ? "black" : "white"}
            position={"relative"}
        >
            <Flechas arrowsCrolor={arrowsCrolor} arrowsBg={arrowsBg}/>
            <Container maxW={maxW} py={"5rem"}>
                <HStack justify={"space-between"} width={"80%"} m={"auto"}>
                    <HStack justify={"center"}>
                        <Heading mb={"-0.1rem"} fontSize={"1.5rem"}>
                            CATEGORIA
                        </Heading>
                        <BiSolidDownArrow fontSize={"1.5rem"} />
                    </HStack>

                    <Heading
                        size={"3xl"}
                        fontWeight={300}
                        display={"flex"}
                        alignItems={"center"}
                    >
                        {title}
                    </Heading>

                    <HStack justify={"center"}>
                        <Heading mb={"-0.1rem"} fontSize={"1.5rem"}>
                            FILTRO
                        </Heading>
                        <GiHamburgerMenu fontSize={"1.5rem"} />
                    </HStack>
                </HStack>
                {children}
            </Container>
        </Box>
    );
}

function Flechas({arrowsCrolor, arrowsBg}) {
    return (
        <HStack
            position={"absolute"}
            w={"100%"}
            h={"100%"}
            justify={"space-between"}
            zIndex={2}
        >
            <Flex bgGradient={`linear(to-r, ${arrowsBg} 60%, transparent 100%)`} h={"100%"} align={"center"} px={"3rem"}>
                <MdOutlineArrowBackIos color={arrowsCrolor} fontSize={"5rem"}/>
            </Flex>

            <Flex bgGradient={`linear(to-r, transparent 0%, ${arrowsBg} 80%)`} h={"100%"} align={"center"} px={"3rem"}>
                <MdOutlineArrowForwardIos color={arrowsCrolor} fontSize={"5rem"}/>
            </Flex>
        </HStack>
    );
}
