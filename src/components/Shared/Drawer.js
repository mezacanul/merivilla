import { Heading, HStack, VStack } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdArrowRightAlt } from "react-icons/md";
import { Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";
import { useEffect } from "react";

export default function DrawerMenu({isOpen, onClose}) {
    const router = useRouter();

    useEffect(()=>{
        if(router.asPath == "/#contacto"){
            scroller.scrollTo("contacto", {
                duration: 500,
                smooth: true,
                offset: -100, // Adjust this value for the offset
            });
            console.log("contacto id");
        }
    }, [])

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={["2rem", "sm"]}>
            <DrawerOverlay />
            <DrawerContent color={"black"} px={"1.5rem"}>
                <DrawerCloseButton m={"0.5rem"} />
                <DrawerHeader fontSize={"2.2rem"} mt={"2rem"} mb={"0.5rem"}>MERIVILLA</DrawerHeader>

                <DrawerBody color={"black"}>
                    <VStack align={"flex-start"}>
                        <CLink href={"contenidoeducativo"}>Contenido Educativo</CLink>
                        <CLink href={"consultoria"}>Consultoria</CLink>
                        <CLink href={"nosotros"}>Quienes Somos</CLink>
                        <CLink href={"/#contacto"}>Contacto</CLink>
                        <CLink href={"ventaje"}>
                            <Text
                                bgGradient="linear(45deg, #671ac5, #a081ff)"
                                bgClip="text"
                                as={"b"}
                                size={"sm"}
                            >
                                VENTAJE
                            </Text>
                        </CLink>
                        <CLink href={"login"}>Iniciar Sesión</CLink>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

function CLink({ children, href }) {
    return (
        <HStack
            borderBottom={"1px"}
            pb={"0.1rem"}
            borderColor={"transparent"}
            transition="all 0.4s ease-in-out"
            ml={"-1rem"}
            _hover={{
                // borderColor: "black",
                ml: "0rem",
                "& .arrow-icon": {
                    opacity: 1, // Optional styling
                },
            }}
            overflow={"hidden"}
        >
            <Box
                className="arrow-icon"
                opacity={0}
                transition="all 0.4s ease-in-out"
            >
                <MdArrowRightAlt fontSize={"1.2rem"} />
            </Box>

            <ChakraLink
                as={NextLink}
                ml={"-0.4rem"}
                href={href}
                borderBottom={"1px"}
                pb={"0.1rem"}
                borderColor={"transparent"}
                transition="all 0.4s ease-in-out"
                _hover={{
                    textDecor: "none",
                    fontWeight: 800
                }}
            >
                <Text size={"sm"}>
                    {children}
                </Text>
            </ChakraLink>
        </HStack>
    );
}
