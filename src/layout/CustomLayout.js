import hexToRgba from "@/utils/hexToRgba";
import { Box, Container, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
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
            {/* Flechas Overlay  */}
            {/* <Flechas arrowsCrolor={arrowsCrolor} arrowsBg={arrowsBg}/> */}
            
            <Container maxW={{base:"100%", xl: "85%"}} py={"5rem"}>
                {/* Filtros y Titulo : Desktop */}
                <HStack display={{base:"none", xl: "flex"}} justify={"space-between"} m={"auto"}>
                    
                    <Control type={"CATEGORIA"} icon={<BiSolidDownArrow  />}/>
                    <Heading
                        display={"flex"}
                        alignItems={"center"}
                        size={{base:"sm", md: "lg"}}
                    >
                        {title}
                    </Heading>
                    <Control type={"FILTRO"} icon={<GiHamburgerMenu  />}/>
                </HStack>

                {/* Filtros y Titulo : Mobile and Tablet */}
                <VStack display={{base:"flex", xl: "none"}} align={{base:"flex-start", md: "center"}} w={"90%"} mx={"auto"}>
                    <Heading size={{base:"sm", md: "lg"}} mb={"1rem"}>{title}</Heading>
                    <Control type={"CATEGORIA"} icon={<BiSolidDownArrow  />}/>
                    <Control type={"FILTRO"} icon={<GiHamburgerMenu  />}/>
                </VStack>

                
                {children}
            </Container>
        </Box>
    );
}

function Control({type, icon}) {
    return (
        <HStack justify={"center"}>
            <Text mb={"-0.1rem"}>
                {type}
            </Text>
            <Text fontSize={"1.5rem"}>
                {icon}
            </Text>
        </HStack>
    )
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
