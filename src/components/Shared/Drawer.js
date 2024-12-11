import { HStack, VStack } from "@chakra-ui/react";
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

export default function DrawerMenu({isOpen, onClose}) {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent color={"black"}>
                <DrawerCloseButton />
                <DrawerHeader mt={"1.5rem"} fontWeight={800} fontSize={"1.5rem"}>MERIVILLA</DrawerHeader>

                <DrawerBody color={"black"}>
                    <VStack align={"flex-start"}>
                        <CLink href={"#"}>Contenido Educativo</CLink>
                        <CLink href={"#"}>Consultoria</CLink>
                        <CLink href={"#"}>Quienes Somos</CLink>
                        <CLink href={"#"}>Contacto</CLink>
                        <CLink href={"#"}>
                            <Text
                                bgGradient="linear(45deg, #671ac5, #a081ff)"
                                bgClip="text"
                                fontWeight={"800"}
                            >
                                VENTAJE
                            </Text>
                        </CLink>
                        <CLink href={"#"}>Blogs</CLink>
                        <CLink href={"#"}>Iniciar Sesión</CLink>
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
                {children}
            </ChakraLink>
        </HStack>
    );
}
